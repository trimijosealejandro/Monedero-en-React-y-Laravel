import React from 'react';

export default function TranferList(transfers) {
    return (
        <div>
            <table className="table">
                        <tbody>
                            {transfers.map((transfer)=>(
                                 <tr key={transfer.id}>
                                 <td>{transfer.descripcion}</td>
                                 <td
                                    className={transfer.amount > 0 ? 'text-success':'text-danger'}
                                 >{transfer.amount}</td>
                             </tr>
                            ))}

                        </tbody>
                    </table>
        </div>
    )
}
