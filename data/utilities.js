function totalSpending(transactions) {
    let totalSpending = 0;
    transactions.forEach(elem => {
        totalSpending += parseFloat(elem.amount);
    });
    return totalSpending;
}

function totalCategories(categories) {
    let cats = [];
    categories.forEach(elem => {
        if (!cats.includes(elem.type)) {
            cats.push(elem.type);
        }
    });
    return cats.length;
}

function totalGoals(goals) {
    return goals.length;
}

function percentOfGoals(goals, transactions) {
    goals.forEach(goal => {
        var totalSpending = 0;
        transactions.forEach(trans => {
            if (trans.type == goal.type) {
                totalSpending += parseFloat(trans.amount);
            }
        });
        if (totalSpending == 0) {
            var value = 0;
        } else {
            var value = (totalSpending / goal.amount) * 100;
        }
        goal.percent = value.toFixed(2);
    });
    return goals;
}

let exportedMethods = { totalSpending, totalCategories, totalGoals, percentOfGoals }
module.exports = exportedMethods;