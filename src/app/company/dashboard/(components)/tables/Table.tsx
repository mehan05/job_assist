import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import React from 'react'

const TableLayoutComponent = () => {    
 
  return (
            <div className="  dark:bg-black border border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  rounded-xl p-5 w-full h-80 max-h-80 min-h-72 scrollable-element  overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead > Workspace Name </TableHead>
                    <TableHead> Members </TableHead>
                    <TableHead>Jobs Posted</TableHead>
                    <TableHead>Join Requests </TableHead>
                    <TableHead>Actions </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                            <TableCell className="font-medium">0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                            <div className="flex gap-2  items-center">
                                <div>
                                    <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Edit</button>
                                </div>
                                <div>/</div>
                                <div>
                                <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Delete</button>
                                </div>
                            </div>
                        </TableCell>
                   
                    </TableRow>
                    <TableRow>
                            <TableCell className="font-medium">0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                            <div className="flex gap-2  items-center">
                                <div>
                                    <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Edit</button>
                                </div>
                                <div>/</div>
                                <div>
                                <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Delete</button>
                                </div>
                            </div>
                        </TableCell>
                   
                    </TableRow>
                    <TableRow>
                            <TableCell className="font-medium">0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                            <div className="flex gap-2  items-center">
                                <div>
                                    <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Edit</button>
                                </div>
                                <div>/</div>
                                <div>
                                <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Delete</button>
                                </div>
                            </div>
                        </TableCell>
                   
                    </TableRow>
                    <TableRow>
                            <TableCell className="font-medium">0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                            <div className="flex gap-2  items-center">
                                <div>
                                    <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Edit</button>
                                </div>
                                <div>/</div>
                                <div>
                                <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Delete</button>
                                </div>
                            </div>
                        </TableCell>
                   
                    </TableRow>
                    <TableRow>
                            <TableCell className="font-medium">0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                            <div className="flex gap-2  items-center">
                                <div>
                                    <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Edit</button>
                                </div>
                                <div>/</div>
                                <div>
                                <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Delete</button>
                                </div>
                            </div>
                        </TableCell>
                   
                    </TableRow>
                    <TableRow>
                            <TableCell className="font-medium">0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                            <div className="flex gap-2  items-center">
                                <div>
                                    <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Edit</button>
                                </div>
                                <div>/</div>
                                <div>
                                <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">Delete</button>
                                </div>
                            </div>
                        </TableCell>
                   
                    </TableRow>
                </TableBody>
            </Table>

            </div>
  )
}

export default TableLayoutComponent