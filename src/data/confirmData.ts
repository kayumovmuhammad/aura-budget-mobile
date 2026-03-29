const confirmData = {
    "once": [
        {"name": "category", inputType: "input"},
        {"name": "day", inputType: "input:date"},
        {"name": "money_amount", inputType: "input:number"},
    ],
    "daily": [
        {"name": "category", inputType: "input"},
        {"name": "money_amount", inputType: "input:number"},
        {"name": "start_date", inputType: "input:date"},
        {"name": "finish_date", inputType: "input:date"},
    ],
    "weekly": [
        {"name": "category", inputType: "input"},
        {"name": "money_amount", inputType: "input:number"},
        {"name": "day", inputType: "input:weekday"},
        {"name": "start_date", inputType: "input:date"},
        {"name": "finish_date", inputType: "input:date"},
    ],
    "monthly": [
        {"name": "category", inputType: "input"},
        {"name": "money_amount", inputType: "input:number"},
        {"name": "day", inputType: "input:day_of_month"},
        {"name": "start_date", inputType: "input:date"},
        {"name": "finish_date", inputType: "input:date"},
    ],
    "annual": [
        {"name": "category", inputType: "input"},
        {"name": "money_amount", inputType: "input:number"},
        {"name": "day", inputType: "input:day_of_year"},
        {"name": "start_date", inputType: "input:date"},
        {"name": "finish_date", inputType: "input:date"},
    ],
}

export default confirmData;
