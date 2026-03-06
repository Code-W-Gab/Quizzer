import AddQuestionFolder from "./AddQuestionFolder";
import { useParams } from "react-router-dom";
import Header from "./Header";
import EllipsisNavbar from "../../Common/EllipsisNavbar";
import { deleteQuestion } from "../../../services/questionService";
import toast from "react-hot-toast";
import { useState } from "react";
import EditQuestionDialog from "./EditQuestionDialog";
import Delete from "../../Common/Delete";
import MobileEllipsisNavbarQuestion from "../../Common/MobileEllipsisNavBarQuestion";

export default function QuestionList({questionFolder, getAllQuizByFolder}) {
  const { name } = useParams()
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  function handleDeleteQuestion(id) {
    deleteQuestion(id)
      .then(res => {
        toast.success("Question Successfully Deleted!")
        setIsDeleteModalOpen(false)
        getAllQuizByFolder()
      }).catch(err => console.log(err))
  }

  function handleEditQuestion(question) {
    setSelectedQuestion(question)
    setIsEditModalOpen(true)
  }

  
  return(
    <div className="bg-white dark:bg-[#222222] min-h-screen">
      <Header name={name} to={"/Quizzes"}/>
      <div className="md:px-6">
        <div className="px-4 md:px-0">
          <AddQuestionFolder getAllQuizByFolder={getAllQuizByFolder}/>
        </div>
        
        {/* Table to Desktop Size */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-6 items-start">
          {questionFolder.length === 0
          ? <h1 className="text-lg dark:text-white">No question added!</h1>
          : questionFolder.map((folder) => {
            return(
              <div key={folder._id} className="bg-gray-300 dark:bg-gray-600 dark:text-white p-3 md:p-4 rounded-md relative">
                <EllipsisNavbar 
                  onDelete={() => {
                    setIsDeleteModalOpen(true)
                    setSelectedId(folder._id)
                  }}
                  onEdit={() => handleEditQuestion(folder)}
                />
                <p className="mt-6">{folder.questionText}</p>
                <p className="text-green-500 dark:text-green-400 mb-3 mt-2">{folder.correctAnswer}</p>
              </div>
            )
          })}
        </div>

        {/* Mobile Size */}
        <div className="md:hidden">
          {questionFolder.length === 0
          ? <h1 className="px-4 mt-4 dark:text-white">No question added!</h1>
          : questionFolder.map((folder) => {
            return(
              <div key={folder._id} className="flex items-center justify-between gap-10 dark:text-white border-b border-gray-600 px-4">
                <div>
                  <p className="mt-6">{folder.questionText}</p>
                  <p className="text-green-500 dark:text-green-400 mb-2 mt-1">{folder.correctAnswer}</p>
                </div>
                <MobileEllipsisNavbarQuestion
                  onDelete={() => {
                    setIsDeleteModalOpen(true)
                    setSelectedId(folder._id)
                  }}
                  onEdit={() => handleEditQuestion(folder)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {isEditModalOpen && selectedQuestion && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <EditQuestionDialog
              question={selectedQuestion}
              onClose={() => {
                setIsEditModalOpen(false)
                setSelectedQuestion(null)
              }}
              getAllQuizByFolder={getAllQuizByFolder}
            />
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <Delete 
              name={"question"} 
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={() => handleDeleteQuestion(selectedId)}
            />
          </div>
        </div>
      )}
    </div>
  )
}