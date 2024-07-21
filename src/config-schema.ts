import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  showTutorial: {
    _type: Type.Boolean,
    _default: false,
    _description: 'Enable or Disable Onboarding Walkthrough',
  },
  tutorialData: {
    _type: Type.Array,
    _description: 'List of tutorials to be displayed in the modal',
    _default: [
      {
        title: 'Basic Tutorial',
        description: 'Learn how to efficiently search for patients, register new patients, access user settings, and view ongoing visits and appointments.',
        link : 'home',
        steps: [{
          target: '[aria-label="OpenMRS"]',
          content: 'Welcome to OpenMRS! This is the main dashboard where you can navigate to various features of the system.'
        },
          {
            target: '[name="SearchPatientIcon"]',
            content: 'This is the search icon. Use it to find patients in the system quickly.'
          },
          {
            target: '[name="AddPatientIcon"]',
            content: 'This is the add patient icon. Click here to register a new patient into the system.'
          },
          {
            target: '[name="User"]',
            content: 'The user icon. Click here to change your user preferences and settings.'
          },
          {
            target: '[data-extension-id="active-visits-widget"]',
            content: 'This table displays active visits. Here you can see all the ongoing patient visits.'
          },
          {
            target: '[data-extension-id="home-appointments"]',
            content: 'This table shows appointments. View and manage patient appointments from this section.'
          },
        ],
      },
      {
        title: 'Option Tutorial',
        description: 'Optional Tutorial for debugging purposes',
        link: 'home',
        steps: [{
          target: '[aria-label="OpenMRS"]',
          content: 'Welcome to OpenMRS! This is the main dashboard where you can navigate to various features of the system.'
        },
          {
            target: '[name="SearchPatientIcon"]',
            content: 'This is the search icon. Use it to find patients in the system quickly.',
          },
        ],
      },
      {
        title: 'Patient Registration Tutorial',
        description: 'Learn how to register a new patient into the system.',
        link: 'patient-registration',
        steps: [
          {
            target: '[name="AddPatientIcon"]',
            title: 'Add Patient',
            content: 'Click here to add a patient to the system.',
            disableBeacon: true,
          },
          {
            target: '[aria-label="Demographics Section"]',
            title: 'Demographics',
            content: 'This is the Demographics section. Here you can find various fields and information related to the patient.',
            disableBeacon: true,
          },
          {
            target: '[aria-label="Contact Details Section"]',
            title: 'Contact Details',
            content: "Here you can update the patient's contact information.",
            disableBeacon: true,
          },
          {
            target: '[aria-label="Relationships section"]',
            title: 'Relationships',
            content: "In this section, you can manage the patient's relationships.",
            disableBeacon: true,
          },
        ],
      },
    ],
  },
};

export type Config = {
  showTutorial: boolean;
  tutorialData: {
    title: string;
    description: string;
    link: string;
    steps: {
      target: string;
      title: string;
      content: string;
      disableBeacon: boolean;
    }[];
  }[];
};
