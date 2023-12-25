const UserList = ({users}) => {
    console.log(users)
    return (
        <table className="w-full border-separate border-spacing-0">
            <thead className="h-12">
                <tr>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tl-2xl rounded-bl-2xl border-r-0">Name</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Type</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Created At</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tr-2xl rounded-br-2xl border-l-0">Created By</th>
                </tr>
            </thead>
            <tbody>
                {
                    users ? users.map((user)=>{
                        return(
                        <tr className="h-12 hover:bg-placebo-turquoise" key={user._id}>
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
    )
}

export default UserList