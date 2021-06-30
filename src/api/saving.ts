import axios from 'axios'

export const getAllSavings = () => {
    return axios.get('http://192.168.1.104:3000/api/allSavings')
        .then(res => {
            const savings = res.data
            console.log("SAVINGS")
            return savings
        })
        .catch(e => {
            console.log(e)
        })
}

export const getAllGoals = async () => {
    return axios.get('http://192.168.1.104:3000/api/allGoals')
        .then(res => {
            const goals = res.data
            return goals

        })
        .catch(e => {
            console.log(e)
        })
}

export const addNewSavingToGoal = (data: any) => {
    return axios.post('http://192.168.1.104:3000/api/newSaving', data)
        .then(res => {
            console.log("SAVING CREATED!", res)
        })
        .catch(e => {
            console.log(e)
        })
}
