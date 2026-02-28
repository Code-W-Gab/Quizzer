import AddQuestionFolder from "./AddQuestionFolder";
import { useParams } from "react-router-dom";
import Header from "./Header";
import EllipsisNavbar from "../../Common/EllipsisNavbar";
import { deleteQuestion } from "../../../services/questionService";
import toast from "react-hot-toast";
import { useState } from "react";
import EditQuestionDialog from "./EditQuestionDialog";
import Delete from "../../Common/Delete";

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
        console.log(res)
        getAllQuizByFolder()
      }).catch(err => console.log(err))
  }

  function handleEditQuestion(question) {
    setSelectedQuestion(question)
    setIsEditModalOpen(true)
  }

  
  return(
    <div className="bg-gray-200 min-h-screen">
      <Header name={name} to={"/Quizzes"}/>
      <div className="px-6 py-3">
        <AddQuestionFolder getAllQuizByFolder={getAllQuizByFolder}/>
        <div className="grid grid-cols-4 gap-5 mt-6 items-start ">
          {questionFolder.map((folder) => {
            return(
              <div key={folder._id} className="bg-white px-6 py-2 rounded-md relative">
                <EllipsisNavbar 
                  onDelete={() => {
                    setIsDeleteModalOpen(true)
                    setSelectedId(folder._id)
                  }}
                  onEdit={() => handleEditQuestion(folder)}
                />
                <p className="mt-6">{folder.questionText}</p>
                <p className="text-green-500 mb-3 mt-2">{folder.correctAnswer}</p>
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