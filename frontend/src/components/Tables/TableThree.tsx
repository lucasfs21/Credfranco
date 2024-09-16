import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICommission } from "../../interfaces/commission.interface";

interface TableThreeProps {
  data: Array<ICommission>
  onDelete(commission: ICommission): void
  OnEdit(commission: ICommission): void
}

const formatToBRL = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const TableThree: React.FC<TableThreeProps> = ({ data, onDelete, OnEdit }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Total Sales
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Reference Month
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Commission %
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Commission Value
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((commission, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {commission.user.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatToBRL(Number(commission.total_sales))}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {commission.reference_month}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {commission.commission_percentage.replace('.', ',')}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatToBRL(Number(commission.commission_value))}
                  </p>
                  {/* <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.status === "Paid"
                        ? "bg-success text-success"
                        : packageItem.status === "Unpaid"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                        }`}
                    >
                      {packageItem.status}
                    </p> */}
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <FontAwesomeIcon icon={faPencil} onClick={() => OnEdit(commission)} />
                    </button>
                    <button className="hover:text-primary">
                      <FontAwesomeIcon icon={faTrash} onClick={() => onDelete(commission)} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
