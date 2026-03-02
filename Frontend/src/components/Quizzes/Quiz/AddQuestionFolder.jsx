import { Plus } from "lucide-react"
import { useState } from "react"
import AddQuestionDialog from "./AddQuestionDialog"
import ShortTextDialog from "./ShortTextDialog"
import MultipleChoiceDialog from "./MultipleChoiceDialog"
import TrueFalseDialog from "./TrueFalseDialog"

export default function AddQuestionFolder({getAllQuizByFolder}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShortTextModalOpen, setIsShortTextModalOpen] = useState(false)
  const [isMultipleChoiceModalOpen, setIsMultipleChoiceModalOpen] = useState(false)
  const [isTrueFalseModalOpen, setIsTrueFalseModalOpen] = useState(false)

  return(
    <div>
      <div className="flex justify-between items-center mt-3 ">
        <h1 className="text-md md:text-xl font-bold dark:text-white">Manage Question</h1>
        <button
          onClick={() => setIsModalOpen(true)} 
          className="hidden bg-green-500 text-white p-2 md:flex items-center gap-2 rounded-md"
        >
          <Plus/>
          <span>Add Question</span>
        </button>
      </div>

      {/* Mobile size */}
      <div className="md:hidden fixed right-6 bottom-8">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-green-500 text-white p-3 rounded-full"
        >
          <Plus/>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <AddQuestionDialog 
              onClose={() => setIsModalOpen(false)}
              onOpenShortText={() => {
                setIsModalOpen(false)
                setIsShortTextModalOpen(true)
              }}
              onOpenMultipleChoice={() => {
                setIsModalOpen(false)
                setIsMultipleChoiceModalOpen(true)
              }}
              onOpenTrueFalse={() => {
                setIsModalOpen(false)
                setIsTrueFalseModalOpen(true)
              }}
            />
          </div>
        </div>
      )}

      {isShortTextModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="bg-opacity-25 z-50">
            <ShortTextDialog onClose={() => setIsShortTextModalOpen(false)} getAllQuizByFolder={getAllQuizByFolder}/>
          </div>
        </div>
      )}

      {isMultipleChoiceModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="bg-opacity-25 z-50">
            <MultipleChoiceDialog onClose={() => setIsMultipleChoiceModalOpen(false)} getAllQuizByFolder={getAllQuizByFolder}/>
          </div>
        </div>
      )}

      {isTrueFalseModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="bg-opacity-25 z-50">
            <TrueFalseDialog onClose={() => setIsTrueFalseModalOpen(false)} getAllQuizByFolder={getAllQuizByFolder}/>
          </div>
        </div>
      )}
    </div>
  )
}