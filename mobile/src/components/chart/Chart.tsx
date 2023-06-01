import React, { useContext, useEffect, useState } from 'react'
import { PieChart } from 'react-native-svg-charts'
import { TransactionContext } from '../../contexts/transactionsContext';

export function Chart() {
    const [cat, setCat] = useState([])
    const { categories, getCategories } = useContext(TransactionContext);

    function cats() {
        categories.forEach((category) => {
            setCat([...cat, category.name])
        })

    }

    const groupByCategory = categories.reduce((group, product) => {
        const { name } = product;
        group[name] = group[name] ?? [];
        group[name].push(product);
        return group;
    }, {});
    console.log(groupByCategory);


    useEffect(() => { getCategories(), cats() }, [])


    const data = [50, 10, 40, 95, -4, -24, 85, 91]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)



    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    return <PieChart style={{ height: 200, width: 200 }} data={pieData} />
}
