import { setCustomData } from "atatus-spa";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function EventGenre(props) {
  const [data, setData] = useState([]);
  const { events } = this.props;

  const getData = () => {
    const genres = [
      "React",
      "JavaScript",
      "Node",
      "jQuery",
      "AngularJS"
    ];
    const data = genres.map((genre) => {
      const value = events.filter(({summary}) => summary.includes(genre)).length;
      return { name: genre, value };
    });
    return data;
  };

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400} >
       <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={100}
        fill="#000"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
      </Pie>
    </PieChart>
    </ResponsiveContainer>
  )
}

export default EventGenre;