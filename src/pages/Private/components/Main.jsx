import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import React, { useContext, useState, useEffect } from "react";
import { dataContext } from "../../../App";

const CustomField = ({ label, hint, ...props }) => {
  const { data, setData } = useContext(dataContext);

  const [field, meta] = useField(props);
  const errorStyle =
    meta.touched && meta.error
      ? "border-red-500"
      : !field.value && meta.touched
      ? "border-red-500"
      : "";
  const validStyle = meta.touched && !meta.error ? "border-green-500" : "";
  const baseStyle = "border border-gray-300 rounded-lg p-2 w-full";

  const messageColor =
    meta.error && field.value
      ? "hidden"
      : meta.touched && !meta.error
      ? "text-green-500"
      : "text-gray-500";

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="font-bold block mb-2 dark:text-white"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`${baseStyle} ${errorStyle} ${validStyle} dark:bg-[#323443] dark:text-white`}
        onChange={(event) => {
          field.onChange(event);

          setData((prevData) => {
            return {
              ...prevData,
              general: {
                ...prevData.general,
                [props.name]: event.target.value,
              },
            };
          });
        }}
      />
      <p className={`text-sm ${messageColor}`}>{hint}</p>
      {meta.error && field.value ? (
        <p className="text-red-500 text-sm">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default function Main() {
  const navigate = useNavigate();
  const { data, setData } = useContext(dataContext);

  const handleButtonClick = () => {
    document.getElementById("image").click();
  };

  const [initialValues, setInitialValues] = useState({
    name: "",
    surname: "",
    image: "",
    aboutMe: "",
    email: "",
    number: "",
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData && storedData.general) {
      setInitialValues(storedData.general);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .matches(/^[ა-ჰ]+$/, "მხოლოდ ქართული ასოები")
      .required("სავალდებულოა"),
    surname: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .matches(/^[ა-ჰ]+$/, "მხოლოდ ქართული ასოები")
      .required("სავალდებულოა"),
    image: Yup.mixed().required("სავალდებულოა"),
    email: Yup.string()
      .email("არავალიდური ელ.ფოსტა")
      .matches(/@redberry\.ge$/, "ელ.ფოსტა უნდა მთავრდებოდეს @redberry.ge-ით")
      .required("სავალდებულოა"),
    number: Yup.string()
      .matches(
        /^(\+995)?(5\d{8})$/,
        "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
      )
      .required("სავალდებულოა"),
  });

  const handleSubmit = (values) => {
    setData((prevData) => ({
      ...prevData,
      general: values,
    }));

    localStorage.setItem("data", JSON.stringify({ ...data, general: values }));
    navigate("/experience");
  };

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ errors, touched, setFieldValue, handleChange }) => (
          <Form className="flex flex-col justify-center min-h-screen gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row justify-between w-full">
              <CustomField
                label="სახელი"
                name="name"
                type="text"
                placeholder="ანზორ"
                hint="მინიმუმ 2 სიმბოლო, მხოლოდ ქართული ასოები"
              />
              <CustomField
                label="გვარი"
                name="surname"
                type="text"
                placeholder="მუმლაძე"
                hint="მინიმუმ 2 სიმბოლო, მხოლოდ ქართული ასოები"
              />
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="image"
                className="font-bold block mb-2 dark:text-white"
              >
                პირადი ფოტოს ატვირთვა
              </label>
              <div className="custom-file-input">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result;
                      setFieldValue("image", base64String);

                      setData((prevData) => ({
                        ...prevData,
                        general: {
                          ...prevData.general,
                          image: base64String,
                        },
                      }));

                      localStorage.setItem(
                        "data",
                        JSON.stringify({
                          ...data,
                          general: { ...data.general, image: base64String },
                        })
                      );
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  className="custom-button"
                  onClick={handleButtonClick}
                >
                  ატვირთვა
                </button>
              </div>
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="aboutMe"
                className="font-bold block mb-2 dark:text-white"
              >
                ჩემ შესახებ (არასავალდებულო)
              </label>
              <Field
                as="textarea"
                name="aboutMe"
                placeholder="ზოგადი ინფო შენ შესახებ"
                className="p-2 border border-gray-300 rounded-lg w-full dark:bg-[#323443] dark:text-white"
                onChange={(event) => {
                  handleChange(event);
                  setData((prevData) => ({
                    ...prevData,
                    general: {
                      ...prevData.general,
                      aboutMe: event.target.value,
                    },
                  }));
                }}
              />

              <ErrorMessage
                name="aboutMe"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <CustomField
              label="ელ.ფოსტა"
              name="email"
              type="email"
              placeholder="anzorr666@redberry.ge"
              hint="უნდა მთავრდებოდეს @redberry.ge-ით"
            />
            <CustomField
              label="მობილურის ნომერი"
              name="number"
              type="text"
              placeholder="+995 551 12 34 56"
              hint="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
            />

            <button
              type="submit"
              className="self-end text-white bg-[#6B40E3] rounded-sm pt-1 pb-1 p-4 mt-10 mb-4 md:mb-8"
            >
              შემდეგი
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
