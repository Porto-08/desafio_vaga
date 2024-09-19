"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  CircularProgress,
} from "@mui/material";

interface DataTableProps {
  columns: Array<{ id: string; label: string }>;
  rows: Array<{ [key: string]: any }>;
  getData: (
    page: number,
    searchQuery: string,
    startDate: string | null,
    endDate: string | null
  ) => void;
  totalPages: number;
}

const DataTable = ({ columns, rows, getData, totalPages }: DataTableProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const changePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function getDataByFilter() {
      setLoading(true);
      await getData(page, startDate, endDate);
      setLoading(false);
    }

    getDataByFilter();
  }, [page, rowsPerPage, startDate, endDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper className="flex flex-col h-[80%]">
      <div className="p-4 flex flex-col gap-4">
        <h3 className="text-lg">Busca de transações</h3>
        <div className="flex items-center">
          <TextField
            variant="outlined"
            type="date"
            label="Data inicial"
            value={startDate || ""}
            onChange={handleStartDateChange}
            size="small"
            style={{ marginRight: "16px" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            variant="outlined"
            type="date"
            label="Data final"
            value={endDate || ""}
            onChange={handleEndDateChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination */}
      <div className="p-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={changePage}
          color="primary"
          classes={{
            ul: "justify-end",
          }}
        />
      </div>
    </Paper>
  );
};

export default DataTable;
