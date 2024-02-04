import { useAdminContext } from "../hooks/useAdminContext"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
const UserList = () => {
    const { users, selectedUser, dispatch } = useAdminContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <table className="w-full border-separate border-spacing-0">
                <thead className="h-12">
                    <tr>
                        <th className="bg-blizzard text-left font-bold border-black border-b">Name</th>
                        <th className="bg-blizzard text-left font-bold border-black border-b">Type</th>
                        <th className="bg-blizzard text-left font-bold border-black border-b">Created At</th>
                        <th className="bg-blizzard text-left font-bold border-black border-b">Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users ? users.map((user) => {
                            return (
                                <tr
                                    className="h-12 hover:bg-placebo-turquoise cursor-pointer"
                                    key={user._id}
                                    onMouseDown={() => {
                                        dispatch({ type: 'SELECT_USER', payload: user })
                                        onOpen()
                                    }}>
                                    <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{user.userName}</td>
                                    <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{user.userType}</td>
                                    <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">TBD</td>
                                    <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">TBD</td>
                                </tr>
                            )
                        })
                            :
                            <tr>

                            </tr>
                    }
                </tbody>
            </table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>
                        <p>{selectedUser.userName}'s Details</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col space-y-2">
                            <div>
                                User Name:<input value={selectedUser.userName} className="w-1/2 border-2 ml-2 border-black rounded-md pl-2" />
                            </div>
                            <div>
                                Password:<input value={selectedUser.password} className="w-1/2 border-2 ml-5 border-black rounded-md pl-2" />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserList