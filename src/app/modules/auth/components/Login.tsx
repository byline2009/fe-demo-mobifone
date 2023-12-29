/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as auth from "../redux/AuthRedux";
import { login } from "../redux/AuthCRUD";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        login(values.email, values.password)
          .then((response: any) => {
            console.log("response check", response);
            setLoading(false);
            dispatch(
              auth.actions.login({
                accessToken: response.accessToken,
                user: response.username,
              })
            );
          })
          .catch((e: any) => {
            setLoading(false);
            setSubmitting(false);
            setStatus("The login detail is incorrect");
          });
      }, 10000);
    },
  });

  return (
    <form
      className="form w-100 p-4"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      {/* begin::Heading */}
      <div className="mb-10">
        <h1 className="text-dark mb-3">Sign In to MobiFone</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : (
        <div className="mb-4 bg-light-info p-8 rounded">
          <div className="text-info">
            Sử dụng email và account MobiFone để login
          </div>
        </div>
      )}

      {/* begin::Form group */}
      <div className="fv-row mt-2 ">
        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control form-control-lg form-control-solid",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-2 mt-4">
        <label className="form-label fs-6 fw-bolder text-dark">Password</label>
        <input
          type="password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control form-control-lg form-control-solid",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className="text-center mt-4">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>

        {/* begin::Separator */}

        {/* end::Separator */}

        {/* begin::Google link */}

        {/* end::Google link */}
      </div>
      {/* end::Action */}
    </form>
  );
}
