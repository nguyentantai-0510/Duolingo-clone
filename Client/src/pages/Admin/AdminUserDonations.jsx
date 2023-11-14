const AdminUserDonations = () => {
    return (
        <div className="blogs__content relative rounded-xl overflow-auto">
            <div className="blogs__feed shadow-sm overflow-hidden my-8">
                <table className="border-collapse table-auto w-full text-2xl  ">
                    <thead className="h-24 bg-slate-400">
                        <tr>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-white dark:text-slate-200 text-left">ID</th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-white dark:text-slate-200 text-left">User Name</th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-white dark:text-slate-200 text-left">Donate Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Malcolm Lockyer</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">1961</td>
                        </tr>
                        <tr>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Witchy Woman</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">The Eagles</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">1972</td>
                        </tr>
                        <tr >
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Shining Star</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Earth, Wind, and Fire</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">1975</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUserDonations;