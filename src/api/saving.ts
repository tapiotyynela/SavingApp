import axios from 'axios'

export const getAllSavings = () => {
    return axios.get('http://localhost:3000/api/allSavings')
        .then(res => {
            const savings = res.data
            console.log("SAVINGS", savings)
            return savings
        })
        .catch(e => {
            console.log(e)
        })
}

export const getAllGoals = async () => {
    return axios.get('http://localhost:3000/api/allGoals')
        .then(res => {
            const goals = res.data
            console.log("GOALS", goals)
            return goals
        })
        .catch(e => {
            console.log(e)
        })
}
