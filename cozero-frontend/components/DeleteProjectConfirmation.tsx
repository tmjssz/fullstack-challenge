import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import React from "react"
import { translate } from "../utils/language.utils"

interface Props {
    isOpen: boolean
    onClose: () => void
    onDelete: () => void
}

export default function DeleteProjectConfirmation({ isOpen, onClose, onDelete }: Props) {
    const cancelRef = React.useRef(null)

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{translate('DELETE_PROJECT')}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {translate('DELETE_PROJECT_DESCRIPTION')}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            {translate('NO')}
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={onDelete}>
                            {translate('YES')}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}