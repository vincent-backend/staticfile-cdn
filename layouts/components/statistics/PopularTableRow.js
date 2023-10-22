import { num2DataSize } from '@lib/utils/dataFormat'
import clsx from 'clsx'

const PopularTableRow = ({ row}) => {
  const style_tr = clsx('popular-table-row')

  return (
    <tr className={style_tr} key={row.name}>
      <td className="whitespace-nowrap pl-2 md:pl-4">{row.name}</td>
      <td className="whitespace-nowrap px-3 md:px-4">{row.hits}</td>
      <td className="whitespace-nowrap pr-2 text-right md:pr-4">
        {num2DataSize(row.bandwidth)}
      </td>
    </tr>
  )
}

export default PopularTableRow
