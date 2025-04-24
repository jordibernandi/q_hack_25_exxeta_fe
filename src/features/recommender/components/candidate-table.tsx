import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Info } from "lucide-react";
import { Candidate, CandidateGroup } from "@/lib/types"
import { isProfileNameDuplicate, isProfileNameInCurrentIndex } from "@/lib/utils"
import { useEffect, useState } from "react"


export default function CandidateTable({ data, candidateEmails, currentIndex, onSelectionChange }: {
    data: Candidate[], candidateEmails: CandidateGroup, currentIndex: number, onSelectionChange: (index: number, selection: Record<number, boolean>, currentGroup: Candidate[]) => void;
}) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<number, boolean>>(() => {
        const initialSelection: Record<number, boolean> = {};
        if (candidateEmails && candidateEmails[currentIndex] && data) {
            data.forEach((candidate, index) => {
                initialSelection[index] = candidateEmails[currentIndex].some(
                    (selectedCandidate) => selectedCandidate.profile_name === candidate.profile_name
                );
            });
        }
        return initialSelection;
    });

    const columns: ColumnDef<Candidate>[] = [
        {
            id: "select",
            cell: ({ row }) => (
                <Checkbox
                    checked={isProfileNameInCurrentIndex(candidateEmails, row.getValue("profile_name"), currentIndex)}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    disabled={isProfileNameDuplicate(candidateEmails, row.getValue("profile_name"), currentIndex)} // Disable based on row data
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "profile_name",
            header: "Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("profile_name")}</div>
            ),
        },
        {
            accessorKey: "seniority",
            header: "Seniority",
            cell: ({ row }) => <div className="capitalize">{row.getValue("seniority")}</div>
        },
        {
            accessorKey: "total_score",
            header: () => <div className="text-right">Score</div>,
            cell: ({ row }) => <div className="text-right font-medium">{Number(row.getValue("total_score")).toFixed(1)}</div>
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Info className="mr-2 h-4 w-4 opacity-70" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-160">
                            <div className="flex justify-between space-x-4">
                                <p>
                                    <b>Summary: </b>{`${row.original.description_explanation}`}
                                    <br /><br />
                                    <b className="text-blue-800">Skill: </b>{`${row.original.skills_explanation}`}
                                    <br /><br />
                                    <b className="text-yellow-800">Seniority: </b>{`${row.original.seniority_explanation}`}
                                    <br /><br />
                                    <b className="text-green-800">Language: </b>{`${row.original.geo_lang_explanation}`}
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    useEffect(() => {
        onSelectionChange(currentIndex, rowSelection, data);
    }, [rowSelection, currentIndex]);

    return (
        <>
            <div className="mb-4 flex items-center gap-4">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("profile_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("profile_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="[&:has([role=checkbox])]:pl-3"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="[&:has([role=checkbox])]:pl-3"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}
