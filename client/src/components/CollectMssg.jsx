const CollectMssg = ({mssg,closeBox}) => {
    return (
        <div className="h-full fixed left-0 top-0 w-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-2 text-center h-24 flex flex-col items-center justify-center gap-2">
                <p className="font-medium">{mssg}</p>

                <div className="w-full flex items-center gap-4 justify-center">
                    <button className="bg-gray-200 font-medium text-sm rounded-md p-2" onClick={() => closeBox(false)}>No thanks</button>
                    <button className="bg-gray-200 font-medium text-sm rounded-md p-2">Ok</button>
                </div>
            </div>
        </div>
    )
}

export default CollectMssg;