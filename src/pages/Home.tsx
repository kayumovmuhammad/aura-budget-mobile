import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

import Header from '../components/Header';
import BalanceStats from '../components/BalanceStats';
import SummaryCard from '../components/SummaryCard';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import BudgetSelectionModal from '../components/BudgetSelectionModal';
import { Transaction } from '../data/types';
import useTransactionsState, { useFinances } from '../states/transactionsState';

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  // ── Store ──────────────────────────────────────────────────
  const {
    transactions,
    budget,
    activeBudget,
    setActiveBudget,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactionsState();

  const { income, waste, balance, incomeByCategory, wasteByCategory } = useFinances();

  const currentTransactions = transactions[activeBudget] || [];
  const budgetNames = budget.map(b => b.title);

  // ── Theme ──────────────────────────────────────────────────
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      setIsDarkMode(true);
      document.body.classList.add('dark');
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('ion-palette-dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle('dark');
    document.documentElement.classList.toggle('ion-palette-dark');
  };

  // ── Handlers ───────────────────────────────────────────────
  const handleAddTransaction = (tx: Transaction) => {
    addTransaction(tx);
  };

  const handleUpdateTransaction = (id: string, tx: Transaction) => {
    updateTransaction(id, tx);
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <IonPage>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        openBudgetModal={() => setShowBudgetModal(true)}
        selectedBudget={activeBudget}
      />
      <IonContent fullscreen>
        <BalanceStats
          balance={balance}
          incomeDelta={income}
          expenseDelta={waste}
        />

        <SummaryCard
          income={income}
          waste={waste}
          incomeByCategory={incomeByCategory}
          wasteByCategory={wasteByCategory}
        />

        <TransactionList
          transactions={currentTransactions}
          onUpdate={handleUpdateTransaction}
          onDelete={handleDeleteTransaction}
        />

        <div style={{ height: '100px' }}></div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton id="open-add-modal">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      <AddTransactionModal
        triggerId="open-add-modal"
        onSave={handleAddTransaction}
      />

      <BudgetSelectionModal
        isOpen={showBudgetModal}
        onDidDismiss={() => setShowBudgetModal(false)}
        budgets={budgetNames}
        selectedBudget={activeBudget}
        onSelectBudget={setActiveBudget}
      />
    </IonPage>
  );
};

export default Home;
