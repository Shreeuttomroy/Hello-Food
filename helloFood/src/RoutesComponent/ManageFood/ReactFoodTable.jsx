import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

function ReactTable({ columns, foods }) {
    console.log(foods);
    const table = useReactTable({
        foods,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <>
            <div>
                {
                    foods ?
                        <table>
                            <thead>
                                {table.getHeaderGroups().map(headergroup => <tr key={headergroup.id}>
                                    {
                                        headergroup.headers.map(header => <th key={header.id}>
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>)
                                    }
                                </tr>)
                                }
                            </thead>
                            <tbody>
                                {/* {table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))} */}
                            </tbody>
                        </table> :
                        <div>Data Not Found!</div>
                }
            </div>
        </>
    );
}

export default ReactTable;