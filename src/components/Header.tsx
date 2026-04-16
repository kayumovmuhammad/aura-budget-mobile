import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { chevronDownOutline, moonOutline, sunnyOutline, settingsOutline } from 'ionicons/icons';

interface HeaderProps {
  openBudgetModal: () => void;
  selectedBudget: string;
}

const Header: React.FC<HeaderProps> = ({ openBudgetModal, selectedBudget }) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar style={{ paddingBottom: '10px' }}>
        <div slot="start" className="budget-switcher" onClick={openBudgetModal}>
          {selectedBudget}
          <IonIcon icon={chevronDownOutline} style={{ marginLeft: '4px' }} />
        </div>
        <IonButtons slot="end">
          <IonButton color="primary" routerLink="/settings">
            <IonIcon slot="icon-only" icon={settingsOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
