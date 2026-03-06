import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteQuizFolder, getAllQuizByFolder } from "../../../services/quizService";
import EllipsisNavbar from "../../Common/EllipsisNavbar";
import toast from "react-hot-toast";
import EditQuizFolder from "./EditQuizFolder";
import Delete from "../../Common/Delete";
import MobileEllipsisNavbar from "../../Common/MobileEllipsisNavBar";
import ShareQuizDialog from '../../Quizzes/Quiz/ShareQuizDialog'; // Add dialog
import { generateShareCode as generateCode } from '../../../services/quizService';

export default function QuizList({quizFolder, fetchQuizFolder}) {
  const [questionCounts, setQuestionCounts] = useState({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null)
  const [shareDialog, setShareDialog] = useState(null);

  const handleGenerateCode = async () => {
    try {
      const result = await generateCode(shareDialog._id);
      toast.success('Share code generated successfully!');
      // Update the folder in state with new shareCode
      setShareDialog({
        ...shareDialog,
        shareCode: result.shareCode,
        isShared: true
      });
      fetchQuizFolder(); // Refresh folder list
    } catch (error) {
      toast.error('Failed to generate share code');
    }
  };

  useEffect(() => {
    // Fetch question counts for all folders
    const fetchQuestionCounts = async () => {
      const counts = {}
      
      for (const folder of quizFolder) {
        try {
          const response = await getAllQuizByFolder(folder._id)
          counts[folder._id] = response.data.data.length
        } catch (error) {
          console.log(error)
          counts[folder._id] = 0
        }
      }
      
      setQuestionCounts(counts)
    }

    if (quizFolder.length > 0) {
      fetchQuestionCounts()
    }
  }, [quizFolder])

  function handleDeleteFolder(folderId) {
    deleteQuizFolder(folderId)
      .then(res => {
        toast.success("Folder successfully deleted!")
        fetchQuizFolder()
        setIsDeleteModalOpen(false)
      }).catch(err => console.log(err))
  }

  function handleEditFolder(folderId) {
    setSelectedId(folderId)
    setIsEditModalOpen(true)
  }

  return(
    <div>
      {/* Table to Desktop Size */}
      <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {quizFolder.length === 0
        ? <h1 className="text-xl px-3 font-semibold dark:text-white">No quiz added!</h1>
        : quizFolder.map((folder) => {
          const questionCount = questionCounts[folder._id] || 0
          
          return(
            <div className="bg-gray-300 dark:bg-gray-600 dark:text-white p-3 md:p-4  rounded-md hover:bg-blue-400 hover:text-white relative h-fit" key={folder._id}>
              <EllipsisNavbar
                onDelete={() => {
                  setIsDeleteModalOpen(true)
                  setSelectedId(folder._id)
                }}
                onEdit={() => handleEditFolder(folder._id)}
                
              />
              <Link to={`/Quizzes/${folder.name}/${folder._id}`}>
                <h1 className="text-xl font-semibold mb-1 mt-4 break-all">{folder.name}</h1>
                <p className="tonShare={() => setShareDialog(folder)}ext-sm mb-3">{questionCount} {questionCount === 1 ? 'question' : 'questions'}</p>
              </Link>
            </div>
          )
        })}
      </div>
      {/* Mobile size */}
      <div className="md:hidden">
        {quizFolder.length === 0
        ? <h1 className='text-lg px-3'>No quiz added!</h1>
        : quizFolder.map((folder) => {
          const questionCount = questionCounts[folder._id] || 0

          return(
            <div className="flex items-center justify-between gap-10 border-b px-3 border-gray-600 dark:hover:bg-blue-400 dark:text-white" key={folder._id}>
              <Link to={`/Quizzes/${folder.name}/${folder._id}`}>
                <h1 className="text-md font-semibold mb-1 mt-3 break-all">{folder.name}</h1>
                <p className="text-xs mb-3 text-gray-700 dark:text-gray-300">{questionCount} {questionCount === 1 ? 'question' : 'questions'}</p>
              </Link>
              <MobileEllipsisNavbar
                onDelete={() => {
                  setIsDeleteModalOpen(true)
                  setSelectedId(folder._id)
                }}
                onEdit={() => handleEditFolder(folder._id)}
                onShare={() => setShareDialog(folder)}
              />
            </div>
          )
        })}
      </div>

      {shareDialog && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
              <ShareQuizDialog
                folder={shareDialog}
                onGenerateCode={handleGenerateCode}
                onClose={() => setShareDialog(null)}
              />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <EditQuizFolder
              folderId={selectedId}
              onClose={() => setIsEditModalOpen(false)}
              fetchQuizFolder={fetchQuizFolder}
            />
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <Delete 
              name={"folder"}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={() => handleDeleteFolder(selectedId)}
            />
          </div>
        </div>
      )}
    </div>
  )
}