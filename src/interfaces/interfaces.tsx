export interface Goal {
    id: number
    name: string
    moneygoal: number
    adInfo: string
}

export interface Saving {
    amount: number
    adinfo: string
    goalid: number
}

export interface DropDownValue {
    label: string
    value: number
}

export interface TotalSavingsProps {
    savings: Saving[]
    goals: Goal[]
    getSavingsAndGoals: Function
    totalSavings: number
}

export interface SavingHisoryProps {
    savings: Saving[]
}