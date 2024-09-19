"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import { UploadFile } from "@/components/UploadFile";
import Api from "@/services/config/api";
import moment from "moment";

interface Row {
  transaction_id: string;
  amount: number;
  transaction_date: string;
  user_name: string;
  user_document: string;
}

export default function Home() {
  const columns = [
    { id: "transaction_id", label: "ID da Transação" },
    { id: "amount", label: "Valor" },
    { id: "transaction_date", label: "Data da Transação" },
    { id: "user_name", label: "Nome do Usuário" },
    { id: "user_document", label: "Documento do Usuário" },
  ];
  const [rows, setRows] = useState<Row[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  async function getDataByFilter(
    page: number,
    startDate: string | null,
    endDate: string | null
  ) {
    let url = `/transactions?page=${page}`;

    if (startDate && endDate) {
      url += `&start_date=${startDate}&end_date=${endDate}`;
    }

    try {
      const result = await Api.get(url);

      const data = [];

      for (const transaction of result.data.data) {
        for (const user of transaction.users) {
          data.push({
            transaction_id: transaction.transaction_id,
            amount: transaction.amount,
            transaction_date: moment(transaction.transaction_date).format(
              "DD/MM/YYYY"
            ),
            user_name: user.name,
            user_document: user.document,
          });
        }
      }

      setRows(data);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="h-screen w-[1200px] flex flex-col items-center m-auto text-white">
      <div className="w-full flex justify-between align-middle mt-10">
        <h1 className="text-3xl">Desafio Zeztra</h1>
        <section>
          <UploadFile />
        </section>
      </div>

      <section className="w-full h-full mt-8">
        <DataTable
          columns={columns}
          rows={rows}
          getData={getDataByFilter}
          totalPages={totalPages}
        />
      </section>
    </div>
  );
}
