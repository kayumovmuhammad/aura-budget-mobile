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
import useSettingsState from '../states/settingsState';
import NoScrollbarContainer from '../components/NoScrollbarContainer';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
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
    addBudget,
    editBudget,
    deleteBudget,
  } = useTransactionsState();

  const { income, waste, balance, incomeByCategory, wasteByCategory } = useFinances();

  const currentTransactions = transactions[activeBudget] || [];
  const { t } = useTranslation();


  // ── Theme ──────────────────────────────────────────────────
  const { theme, setTheme } = useSettingsState();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let dark = false;
    if (theme === 'system') {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      dark = theme === 'dark';
    }

    setIsDarkMode(dark);
    if (dark) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('ion-palette-dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
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
        openBudgetModal={() => setShowBudgetModal(true)}
        selectedBudget={budget.find(b => b.id === activeBudget)?.title || t('Unknown')}
      />
      <IonContent fullscreen scrollY={false} forceOverscroll={false}>
        <NoScrollbarContainer>
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
        </NoScrollbarContainer>
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
        budgets={budget}
        selectedBudget={activeBudget}
        onSelectBudget={setActiveBudget}
        onAddBudget={addBudget}
        onEditBudget={editBudget}
        onDeleteBudget={deleteBudget}
      />
    </IonPage>
  );
};

export default Home;
