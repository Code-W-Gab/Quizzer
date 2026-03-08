import AddQuestionFolder from "./AddQuestionFolder";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { deleteQuestion } from "../../../services/questionService";
import toast from "react-hot-toast";
import { useState } from "react";
import EditQuestionDialog from "./EditQuestionDialog";
import Delete from "../../Common/Delete";
import MobileEllipsisNavbarQuestion from "../../Common/MobileEllipsisNavBarQuestion";
import EllipsisNavbarQuestion from "../../Common/EllipsisNavbarQuestion";

export default function QuestionList({questionFolder, getAllQuizByFolder}) {
  const { name } = useParams()
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleDeleteQuestion(id) {
    setLoading(true)
    deleteQuestion(id)
      .then(res => {
        setLoading(false)
        toast.success("Question Successfully Deleted!")
        setIsDeleteModalOpen(false)
        getAllQuizByFolder()
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
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
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6 items-start">
          {questionFolder.length === 0
          ? <h1 className="text-lg dark:text-white">No question added!</h1>
          : questionFolder.map((folder) => {
            return(
              <div key={folder._id} className="bg-gray-300 dark:bg-gray-600 dark:text-white p-2 md:p-3 rounded-md relative">
                <EllipsisNavbarQuestion 
                  onDelete={() => {
                    setIsDeleteModalOpen(true)
                    setSelectedId(folder._id)
                  }}
                  onEdit={() => handleEditQuestion(folder)}
                />
                <p className="mt-6">{folder.questionText}</p>
                <p className="text-blue-500 dark:text-blue-400 mb-3 mt-2">{folder.correctAnswer}</p>
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
                  <p className="text-blue-500 dark:text-blue-400 mb-2 mt-1">{folder.correctAnswer}</p>
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

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-gray-700 font-semibold">Logging in...</p>
          </div>
        </div>
      )}
    </div>
  )
}