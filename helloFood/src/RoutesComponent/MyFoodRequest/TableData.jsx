
function TableData({ food,handleCancel }) {
    return (
        <>
            <tr>
                <th>{food?.name}</th>
                <td>{food?.pickuplocation}</td>
                <td>{food?.expired}</td>
                <td>{food?.reqdate}</td>
                <td>{food?.donation} USD</td>
                <td>{food?.satus}</td>
                <td><button onClick={() => handleCancel(food.id)} className="btn btn-outline btn-error">Cancel</button></td>
            </tr>
        </>
    );
}

export default TableData;