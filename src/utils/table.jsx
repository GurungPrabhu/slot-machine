/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getSortedData = (data, filterObj) => {
  if (filterObj.id === "date") {
    return data.sort((a, b) => {
      const date1 = new Date(a[filterObj.id]);
      const date2 = new Date(b[filterObj.id]);

      if (filterObj.type === "ascending") {
        if (date1 < date2) return -1;
        return 1;
      }
      if (date1 < date2) return 1;
      return -1;
    });
  }

  return data.sort((a, b) => {
    const date1 = new Date(a[filterObj.id]);
    const date2 = new Date(b[filterObj.id]);
    if (filterObj.type === "ascending") {
      if (date1 < date2) return -1;
      return 1;
    }
    if (date1 < date2) return 1;
    return -1;
  });
};

const Table = () => {
  const [column, setColumn] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState({ id: "", type: "" });
  const dataList = useSelector((store) => store.game.currentData.log);

  useEffect(() => {
    const keys = (dataList || []).length > 0 ? Object.keys(dataList[0]) : [];
    setColumn(keys);
    if (filter.id.length > 0) setTableData(getSortedData(tableData, filter));
    else setTableData(dataList || []);
  }, [dataList, filter]);

  const onClickTableHead = (e, type) => {
    setFilter({
      id: e.currentTarget.id,
      type,
    });
  };

  return (
    <table className="table table-bordered m-4">
      <thead>
        <tr>
          {column.map((key) => (
            <th scope="col" key={key}>
              <button
                onClick={(e) => onClickTableHead(e, "descending")}
                className="btn btn-sm "
                style={{ float: "left" }}
                id={key}
                type="button"
              >
                <i className="fa fa-caret-up" aria-hidden="true" />
              </button>
              {key}
              <button
                onClick={(e) => onClickTableHead(e, "ascending")}
                className="btn btn-sm "
                style={{ float: "right" }}
                id={key}
                type="button"
              >
                <i className="fa fa-caret-down" aria-hidden="true" />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={`-${item[column[0]]}`}>
            {column.map((key) => {
              if (key === "date") {
                return (
                  <td key={`${key} ${item[key]}`}>
                    {new Date(item[key]).toString()}
                  </td>
                );
              }
              return <td key={`${key} ${item[key]}`}>{item[key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
