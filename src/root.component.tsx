import React, { useEffect } from 'react';
import ReactJoyride, { ACTIONS, type CallBackProps, EVENTS, type Step } from 'react-joyride';
import { navigate, useDefineAppContext } from '@openmrs/esm-framework';
import { type TutorialContext } from './types';

const RootComponent: React.FC = () => {

  const [showTutorial, setShowTutorial] = React.useState(false);
  const [steps, setSteps] = React.useState([]);
  const [stepIndex, setStepIndex] = React.useState(0);

  useDefineAppContext<TutorialContext>('tutorial-context', {
    showTutorial,
    steps,
    setShowTutorial: (showTutorial: boolean) => setShowTutorial(showTutorial),
    setSteps: (steps: Step[]) => setSteps(steps)
  });

  const handleStepChange = (nextStepIndex: number) => {
    if (nextStepIndex < steps.length) {
      const currentStep = steps[nextStepIndex - 1];
      const nextStep = steps[nextStepIndex];

      if (currentStep && currentStep?.data?.next) {
        const basePath = window.getOpenmrsSpaBase();
        const nextPath = `${basePath}${currentStep.data.next}`;
        if (window.location.pathname !== nextPath.replace(basePath, '')) {
          navigate({ to: nextPath });
        }
      }

      setTimeout(() => {
        const targetElement = document.querySelector(nextStep?.target);
        if (targetElement) {
          setShowTutorial(true);
          setStepIndex(nextStepIndex);
        } else {
          handleStepChange(nextStepIndex + 1);
        }
      }, 100);
    } else {
      setStepIndex(0);
      setShowTutorial(false);
    }
  };

  useEffect(() => {
    const handleTargetClick = (event: MouseEvent) => {
      const currentStep = steps[stepIndex];
      if (showTutorial && currentStep?.data?.clickRequired) {
        const targetElement = document.querySelector(currentStep.target);
        if (targetElement && targetElement.contains(event.target as Node)) {
          handleStepChange(stepIndex + 1);
        }
      }
    };

    document.addEventListener('click', handleTargetClick);
    return () => {
      document.removeEventListener('click', handleTargetClick);
    };
  });
  
  const handleJoyrideCallback = (data: CallBackProps) => {
    const {action, index, origin, status, type} = data;

    switch (type) {
      case EVENTS.STEP_AFTER:
      case EVENTS.TARGET_NOT_FOUND:
        handleStepChange(index + (action === ACTIONS.PREV ? -1 : 1));
        break;
      case EVENTS.TOUR_END:
        setStepIndex(0)
        setShowTutorial(false);
        break;
    }
  }

  return (
    <ReactJoyride
      continuous
      debug
      disableScrolling
      showProgress
      showSkipButton
      steps={steps}
      stepIndex={stepIndex}
      run={showTutorial}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#009384',
        },
        overlay: { height: document.body.scrollHeight },
        tooltipTitle: {
          fontWeight: 'bold',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip',
      }}
    />
  );
};
export default RootComponent;
