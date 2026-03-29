/**
 * Utility to generate the AI prompt for parsing transaction descriptions.
 * Includes the specific type annotation and logic requirements provided by the user.
 */

export const getTransactionParserPrompt = () => {
    const currentDate = new Date().toISOString().split('T')[0];

    return `Process the user's transaction description and return a JSON object strictly following this structure:
{
    "message": "ok" | "error description",
    "type": "waste" | "income",
    "money_amount": Number,
    "category": "string", 
    "payment_type": "once" | "monthly" | "annual" | "weekly" | "daily",
    "day": "date_for_once as string(\"YYYY-MM-DD\")" | "day_of_month as string(\"DD\")" | "date_of_year as string(\"MM-DD\")" | "days of week as number from (e.g. 0 is monday | 1 is tuesday  | 2 is wednesday or other)" | "for daily you have to paste null",
    "start_date": "YYYY-MM-DD", 
    "finish_date": "YYYY-MM-DD"
}

Guidelines:
1. category: Write the category name in user's language and only one or two words with like "Food" | "Sport" | "Study" etc.
2. start_date: If user doesn't mention the start date, use current date: ${currentDate}.
3. finish_date: If user doesn't mention the finish date, do not include this field.
4. day mapping: 
   - once: "YYYY-MM-DD"
   - monthly: "DD" (e.g. "05")
   - annual: "MM-DD"
   - weekly: number (0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday)
   - daily: null
`;
};

/**
 * Utility to generate the prompt for financial analysis.
 */
export const getAnalysisPrompt = (transactionsJson: string) => {
    return `You are a helpful assistant for a personal finance app.

## Current data
Transactions: ${transactionsJson}

## Your job
Analyze the user's finances and answer their questions based on the real data above.`;
};
