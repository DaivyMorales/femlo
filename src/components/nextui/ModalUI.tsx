import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { api } from "../../utils/api";
import { HiBadgeCheck } from "react-icons/hi";
import Confetti from "../Confetti";
import { useWaitlist } from "@/store/WaitlistSlice";

interface ModalProps {
  size: "sm" | "md" | "lg" | undefined;
  text: string;
}

export default function ModalUI({ size, text }: ModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [responseStatus, setResponseStatus] = useState(0);
  const [errorStatus, setErrorStatus] = useState(0)
  const [backdrop, setBackdrop] = React.useState<
    "opaque" | "transparent" | "blur" | undefined
  >("opaque");

  const handleOpen = (
    backdrop: "opaque" | "transparent" | "blur" | undefined,
  ) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const { data, setData } = useWaitlist();

  const mutation = api.waitlist.create.useMutation({
    onSuccess: (data) => {
      setResponseStatus(200);
      setData(data);
      console.log("Success:", data);
    },
    onError: (error) => {
      setResponseStatus(500);
      console.error("Error:", error.data?.httpStatus);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      try {
        mutation.mutate({ email: values.email });
      } catch (error) {
        console.error("Failed to submit email:", error);
      }
      onClose();
    },
  });

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="flat"
          onPress={() => handleOpen("opaque")}
          className="bg-blue-500 font-semibold capitalize text-white"
          size={size}
          isDisabled={data.id !== "" ? true : false}
        >
          {data.id !== "" ? "You're in!" : text}
        </Button>
      </div>
      <Modal
        classNames={{
          body: "py-8",
          footer: "border-t-[1px] border-neutral-150",
        }}
        className="border-[1px] border-neutral-200"
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="">
          {(onClose) => (
            <div className="">
              <ModalBody>
                <div className="flex items-start justify-center gap-3">
                  <img
                    src="Me.png"
                    width={40}
                    className="rounded-full"
                    alt=""
                  />
                  <div className="flex w-full flex-col items-start justify-start gap-2">
                    <p className="flex items-center gap-1 text-sm">
                      <span className="flex items-center font-bold text-black">
                        Daivy <HiBadgeCheck color="#1C9BEF" />
                      </span>{" "}
                      @DaivyMorales_
                    </p>
                    <p className="text-sm text-neutral-700">
                      I am so happy you are here!
                    </p>
                    <p className="text-sm text-neutral-700">
                      If you think Femlo is for you and would like to use it in
                      the future, I invite you to{" "}
                      <span className="font-bold text-black">
                        join the waitlist
                      </span>
                    </p>
                    <p className="text-sm text-neutral-700">
                      If you have any comments, feel free to DM me on X and I
                      will be glad to answer you.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <ModalFooter className="flex flex-col">
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    onChange={formik.handleChange}
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    description="We'll never share your email with anyone else."
                  />

                  <span>{errorStatus === 200 && "That email already exists"}</span>

                  <Button
                    // isLoading
                    type="submit"
                    className="bg-blue-600 font-semibold text-white"
                    onPress={
                      responseStatus === 200 &&
                      formik.isValid &&
                      formik.values.email
                        ? undefined
                        : undefined
                    }
                    isDisabled={!formik.isValid || !formik.values.email || errorStatus === 500}
                    spinner={
                      <svg
                        className="h-5 w-5 animate-spin text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    Join Now
                  </Button>
                </ModalFooter>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
