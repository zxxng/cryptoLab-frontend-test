import React from 'react'

interface ModalProps {
  title: string
  children: React.ReactNode
  isModalVisible: boolean
  onClose: () => void
  onConfirm?: () => void
}

const Modal = ({
  title,
  children,
  isModalVisible,
  onClose,
  onConfirm,
}: ModalProps) => {
  if (!isModalVisible) return null

  return (
    <div className="flex justify-center items-center z-10 fixed top-0 left-0 w-screen h-screen bg-neutral-950/50">
      <article className="flex flex-col items-center rounded-lg w-[560px] h-[273px] bg-white px-8 pt-8 pb-9">
        <p className="text-gray-01 text-lg font-medium mb-8">{title}</p>
        {children}
        <div className="flex gap-3 w-full mt-auto text-white">
          <button
            className="inline-block w-full bg-gray-04 rounded-lg px-4 py-2"
            onClick={onClose}
          >
            닫기
          </button>
          {onConfirm && (
            <button
              className="inline-block w-full bg-blue-02 rounded-lg px-4 py-2"
              onClick={onConfirm}
            >
              확인하기
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

export default Modal
