/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material"

export default function DataTable({ columns, data, onEdit, onDelete }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align="right">{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.codigo || row.rut}>
              {columns.map((column) => (
                <TableCell key={column.id} align="right">
                  {column.id === 'actions' ? (
                    <>
                      <Button color="info" onClick={() => onEdit(row)}>Editar</Button>
                      <Button color="error" onClick={() => onDelete(row.codigo || row.rut)}>Eliminar</Button>
                    </>
                  ) : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

