import { Plus } from "lucide-react"
import { useState } from "react"
import AddQuestionDialog from "./AddQuestionDialog"
import ShortTextDialog from "./ShortTextDialog"
import MultipleChoiceDialog from "./MultipleChoiceDialog"
import TrueFalseDialog from "./TrueFalseDialog"

export default function AddQuestionFolder() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShortTextModalOpen, setIsShortTextModalOpen] = useState(false)
  const [isMultipleChoiceModalOpen, setIsMultipleChoiceModalOpen] = useState(false)
  const [isTrueFalseModalOpen, setIsTrueFalseModalOpen] = useState(false)

  return(
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Question</h1>
        <button
          onClick={() => setIsModalOpen(true)} 
          className="bg-green-500 text-white p-2 flex items-center gap-2 rounded-md"
        >
          <Plus/>
          <span>Add Question</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
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
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
            <ShortTextDialog onClose={() => setIsShortTextModalOpen(false)}/>
          </div>
        </div>
      )}

      {isMultipleChoiceModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
            <MultipleChoiceDialog onClose={() => setIsMultipleChoiceModalOpen(false)}/>
          </div>
        </div>
      )}

      {isTrueFalseModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
            <TrueFalseDialog onClose={() => setIsTrueFalseModalOpen(false)}/>
          </div>
        </div>
      )}
    </div>
  )
}