import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
const en = {
  translation: {
    // General
    "Save": "Save",
    "Cancel": "Cancel",
    "Delete": "Delete",
    "Edit": "Edit",
    "Done": "Done",
    "OK": "OK",
    "Unknown": "Unknown",
    "Next": "Next",

    // Home
    "Summary": "Summary",
    "Home": "Home",
    "Orders": "Orders",

    // Settings
    "Settings": "Settings",
    "Appearance": "Appearance",
    "Currency": "Currency",
    "Language": "Language",
    "Light": "Light",
    "Auto": "Auto",
    "Dark": "Dark",

    // SummaryCard / PieChart
    "Income": "Income",
    "Wastes": "Wastes",
    "ALL-TIME": "ALL-TIME",
    "TOTAL": "TOTAL",
    "No data to show": "No data to show",

    // BalanceStats
    "Current Balance": "Current Balance",

    // TransactionList
    "Transactions": "Transactions",
    "See All": "See All",

    // Add / Edit / Describe Transaction
    "Analyzing...": "Analyzing...",
    "What did you spend on?": "What did you spend on?",
    "E.g., Bought groceries for $50 at Walmart today": "E.g., Bought groceries for $50 at Walmart today",
    "Please enter a description before continuing.": "Please enter a description before continuing.",
    "Details": "Details",
    "Waste": "Waste",
    "Payment Mode": "Payment Mode",
    "Once": "Once",
    "Daily": "Daily",
    "Weekly": "Weekly",
    "Monthly": "Monthly",
    "Annual": "Annual",
    "Category": "Category",
    "Money Amount": "Money Amount",
    "Day": "Day",
    "Start Date": "Start Date",
    "Finish Date": "Finish Date",
    "Annotate Transaction": "Annotate Transaction",
    "Edit Transaction": "Edit Transaction",
    "Speech recognition is not available on this device.": "Speech recognition is not available on this device.",
    "Microphone permission denied.": "Microphone permission denied.",
    "Say something...": "Say something...",
    "Speech recognition error.": "Speech recognition error.",
    "Speech recognition is not supported on the web browser.": "Speech recognition is not supported on the web browser.",
    "Listening...": "Listening...",

    // Days
    "Day Of Month": "Day of Month",
    "day of month": "day of month",
    "Day of Month (1-31)": "Day of Month (1-31)",
    "Day Of Year": "Day of Year",
    "Monday": "Monday",
    "Tuesday": "Tuesday",
    "Wednesday": "Wednesday",
    "Thursday": "Thursday",
    "Friday": "Friday",
    "Saturday": "Saturday",
    "Sunday": "Sunday",

    // Budget Selection
    "Cannot Delete": "Cannot Delete",
    "You must have at least one budget.": "You must have at least one budget.",
    "Delete Budget?": "Delete Budget?",
    "Are you sure you want to delete this budget and all its associated transactions?": "Are you sure you want to delete this budget and all its associated transactions?",
    "Are you sure you want to delete ": "Are you sure you want to delete ",
    " and all its associated transactions?": " and all its associated transactions?",
    "Select Budget": "Select Budget",
    "New budget name": "New budget name",

    // Error messages
    "Failed to annotate transaction": "Failed to annotate transaction",

    // Welcome Onboarding
    "Personal Budget": "Personal Budget",
    "Welcome": "Welcome",
    "Choose Language": "Choose Language",
    "Choose Theme": "Choose Theme",
    "Choose Currency": "Choose Currency",
    "Continue": "Continue",
    "Get Started": "Get Started",
    "Personalize your experience": "Personalize your experience"
  }
};

// Russian
const ru = {
  translation: {
    "Save": "Сохранить",
    "Cancel": "Отмена",
    "Delete": "Удалить",
    "Edit": "Изменить",
    "Done": "Готово",
    "OK": "ОК",
    "Unknown": "Неизвестно",
    "Next": "Далее",

    "Summary": "Сводка",
    "Home": "Главная",
    "Orders": "Заказы",

    "Settings": "Настройки",
    "Appearance": "Оформление",
    "Currency": "Валюта",
    "Language": "Язык",
    "Light": "Светлая",
    "Auto": "Авто",
    "Dark": "Тёмная",

    "Income": "Доходы",
    "Wastes": "Расходы",
    "ALL-TIME": "ЗА ВСЁ ВРЕМЯ",
    "TOTAL": "ВСЕГО",
    "No data to show": "Нет данных",

    "Current Balance": "Текущий баланс",

    "Transactions": "Транзакции",
    "See All": "Все",

    "Analyzing...": "Анализ...",
    "What did you spend on?": "На что вы потратили?",
    "E.g., Bought groceries for $50 at Walmart today": "Например: Купил продукты на 50 долларов сегодня",
    "Please enter a description before continuing.": "Пожалуйста, введите описание для продолжения.",
    "Details": "Детали",
    "Waste": "Расход",
    "Payment Mode": "Режим оплаты",
    "Once": "Единожды",
    "Daily": "Ежедневно",
    "Weekly": "Еженедельно",
    "Monthly": "Ежемесячно",
    "Annual": "Ежегодно",
    "Category": "Категория",
    "Money Amount": "Сумма",
    "Day": "День",
    "Start Date": "Дата начала",
    "Finish Date": "Дата окончания",
    "Annotate Transaction": "Создание транзакции",
    "Edit Transaction": "Изменить транзакцию",
    "Speech recognition is not available on this device.": "Распознавание речи недоступно на этом устройстве.",
    "Microphone permission denied.": "Доступ к микрофону запрещен.",
    "Say something...": "Говорите...",
    "Speech recognition error.": "Ошибка распознавания речи.",
    "Speech recognition is not supported on the web browser.": "Распознавание речи не поддерживается в веб-браузере.",
    "Listening...": "Слушаю...",

    "Day Of Month": "День месяца",
    "day of month": "день месяца",
    "Day of Month (1-31)": "День месяца (1-31)",
    "Day Of Year": "День года",
    "Monday": "Понедельник",
    "Tuesday": "Вторник",
    "Wednesday": "Среда",
    "Thursday": "Четверг",
    "Friday": "Пятница",
    "Saturday": "Суббота",
    "Sunday": "Воскресенье",

    "Cannot Delete": "Невозможно удалить",
    "You must have at least one budget.": "У вас должен быть хотя бы один бюджет.",
    "Delete Budget?": "Удалить бюджет?",
    "Are you sure you want to delete this budget and all its associated transactions?": "Вы уверены, что хотите удалить этот бюджет и все связанные с ним транзакции?",
    "Are you sure you want to delete ": "Вы уверены, что хотите удалить ",
    " and all its associated transactions?": " и все связанные с ним транзакции?",
    "Select Budget": "Выбрать бюджет",
    "New budget name": "Новое название бюджета",

    "Failed to annotate transaction": "Не удалось обработать транзакцию",

    "Personal Budget": "Личный бюджет",
    "Welcome": "Добро пожаловать",
    "Choose Language": "Выберите язык",
    "Choose Theme": "Выберите тему",
    "Choose Currency": "Выберите валюту",
    "Continue": "Продолжить",
    "Get Started": "Начать",
    "Personalize your experience": "Настройте приложение под себя"
  }
};

// Spanish
const es = {
  translation: {
    "Save": "Guardar",
    "Cancel": "Cancelar",
    "Delete": "Eliminar",
    "Edit": "Editar",
    "Done": "Hecho",
    "OK": "Aceptar",
    "Unknown": "Desconocido",
    "Next": "Siguiente",

    "Summary": "Resumen",
    "Home": "Inicio",
    "Orders": "Pedidos",

    "Settings": "Ajustes",
    "Appearance": "Apariencia",
    "Currency": "Moneda",
    "Language": "Idioma",
    "Light": "Claro",
    "Auto": "Automático",
    "Dark": "Oscuro",

    "Income": "Ingresos",
    "Wastes": "Gastos",
    "ALL-TIME": "TODO EL TIEMPO",
    "TOTAL": "TOTAL",
    "No data to show": "No hay datos",

    "Current Balance": "Saldo Actual",

    "Transactions": "Transacciones",
    "See All": "Ver Todo",

    "Analyzing...": "Analizando...",
    "What did you spend on?": "¿En qué gastaste?",
    "E.g., Bought groceries for $50 at Walmart today": "Ej., Compré alimentos por $50 hoy",
    "Please enter a description before continuing.": "Por favor, introduce una descripción antes de continuar.",
    "Details": "Detalles",
    "Waste": "Gasto",
    "Payment Mode": "Modo de pago",
    "Once": "Una vez",
    "Daily": "Diario",
    "Weekly": "Semanal",
    "Monthly": "Mensual",
    "Annual": "Anual",
    "Category": "Categoría",
    "Money Amount": "Monto",
    "Day": "Día",
    "Start Date": "Fecha de inicio",
    "Finish Date": "Fecha de fin",
    "Annotate Transaction": "Anotar transacción",
    "Edit Transaction": "Editar transacción",
    "Speech recognition is not available on this device.": "El reconocimiento de voz no está disponible en este dispositivo.",
    "Microphone permission denied.": "Permiso de micrófono denegado.",
    "Say something...": "Di algo...",
    "Speech recognition error.": "Error de reconocimiento de voz.",
    "Speech recognition is not supported on the web browser.": "El reconocimiento de voz no es compatible con el navegador web.",
    "Listening...": "Escuchando...",

    "Day Of Month": "Día del mes",
    "day of month": "Día del mes",
    "Day of Month (1-31)": "Día del mes (1-31)",
    "Day Of Year": "Día del año",
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado",
    "Sunday": "Domingo",

    "Cannot Delete": "No se puede eliminar",
    "You must have at least one budget.": "Debes tener al menos un presupuesto.",
    "Delete Budget?": "¿Eliminar presupuesto?",
    "Are you sure you want to delete this budget and all its associated transactions?": "¿Estás seguro de que deseas eliminar este presupuesto y todas sus transacciones asociadas?",
    "Are you sure you want to delete ": "¿Estás seguro de que deseas eliminar ",
    " and all its associated transactions?": " y todas sus transacciones asociadas?",
    "Select Budget": "Seleccionar presupuesto",
    "New budget name": "Nuevo nombre del presupuesto",

    "Failed to annotate transaction": "Error al procesar la transacción",

    "Personal Budget": "Presupuesto personal",
    "Welcome": "Bienvenido",
    "Choose Language": "Elegir idioma",
    "Choose Theme": "Elegir tema",
    "Choose Currency": "Elegir moneda",
    "Continue": "Continuar",
    "Get Started": "Empezar",
    "Personalize your experience": "Personaliza tu experiencia"
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ru,
      es
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
