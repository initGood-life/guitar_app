import { Button, Step, Stepper } from '@material-tailwind/react';

import type { StepperProps } from '@/types/user.types';

import { StepperEmailData } from './stepper.data';

export const StepList = ({
  activeStep, errors, touched, isSubmitting, emailIsUpdated,
  closeStepper, setActiveStep, handleBack, handleNext,
}: StepperProps) => {
  const isEmailError = !!errors?.email || !touched?.email;
  const isNewEmailError = !!errors?.newemail || !touched?.newemail || !emailIsUpdated;

  const isDisabled = () => (
    activeStep === 0 && (isEmailError)
  ) || (
    activeStep === 1 && (isNewEmailError)
  ) || activeStep > 1;

  const isStepDisabled = (index: number) => (
    index === 1 && (isEmailError)
  ) || (
    index > 1 && (isNewEmailError)
  );

  return (
    <div className="flex flex-col gap-6">
      <Stepper
        activeStep={activeStep}
        color="white"
        className="mt-6"
        lineClassName="bg-white/50"
        activeLineClassName="bg-white"
      >
        {StepperEmailData.steps.map((stepData, index) => (
          <Step
            key={stepData.id}
            className={stepData.style}
            activeClassName={stepData.activeStyle}
            completedClassName={stepData.completedStyle}
            onClick={() => {
              if (!isStepDisabled(index)) {
                setActiveStep(index);
              }
            }}
          >
            {index + 1}
          </Step>

        ))}
      </Stepper>
      <div className="flex justify-between">
        {activeStep < 2 && (
        <Button
          color="white"
          className="w-28 rounded px-3 py-2 font-rubik text-lg font-bold tracking-wider transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-400"
          loading={isSubmitting}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Prev
        </Button>
        )}
        {activeStep === 0 && (
          <Button
            color="white"
            className="w-28 rounded px-3 py-2 font-rubik text-lg font-bold tracking-wider transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-400"
            loading={isSubmitting}
            onClick={handleNext}
            disabled={isDisabled()}
          >
            Next
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            color="white"
            className="relative left-[240px] w-28 rounded px-3 py-2 font-rubik text-lg font-bold tracking-wider transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-400"
            onClick={closeStepper}
          >
            OK
          </Button>
        )}
      </div>
    </div>
  );
};
