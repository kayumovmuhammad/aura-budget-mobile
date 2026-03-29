import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

import Header from '../components/Header';
import BalanceStats from '../components/BalanceStats';
import SummaryCard from '../components/SummaryCard';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import BudgetSelectionModal from '../components/BudgetSelectionModal';


const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('Personal');
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  useEffect(() => {
    // Check initial system preference or saved preference
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
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
    document.documentElement.classList.toggle('ion-palette-dark');
  };

  return (
    <IonPage>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        openBudgetModal={() => setShowBudgetModal(true)}
        selectedBudget={selectedBudget}
      />
      <IonContent fullscreen>
        <BalanceStats
          balance={4250.00}
          incomeDelta={1200}
          expenseDelta={850}
        />

        <SummaryCard />

        <TransactionList />

        <div style={{ height: '100px' }}></div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton id="open-add-modal">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      <AddTransactionModal triggerId="open-add-modal" />

      <BudgetSelectionModal
        isOpen={showBudgetModal}
        onDidDismiss={() => setShowBudgetModal(false)}
        selectedBudget={selectedBudget}
        onSelectBudget={setSelectedBudget}
      />
    </IonPage>
  );
};

export default Home;
