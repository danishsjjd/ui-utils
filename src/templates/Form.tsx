import { ErrorMessage } from "@hookform/error-message"
import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  useForm,
  UseFormRegister,
} from "react-hook-form"

type FormData = {
  name: string
  email: string
  message: string
}

function Form() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({})

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input<FormData>
          name="name"
          register={register}
          title={"Enter Full Name"}
          type="text"
          validations={{ required: "Please Type Your Name" }}
          errors={errors}
        />
        <Input<FormData>
          name="email"
          register={register}
          title={"Your Email"}
          type="email"
          validations={{
            required: "Enter Your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
          errors={errors}
        />
      </div>
      <label>
        <h3 className="pb-2">Enter Message</h3>
        <textarea
          className="w-full"
          {...register("message", {
            required: "Please explain your message",
            minLength: { message: "Explain Your Message", value: 8 },
          })}
          rows={5}
        ></textarea>
        <p className="mt-1 text-red-600">{errors?.message?.message}</p>
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

type InputProps<T extends {}> = {
  title: string
  type: React.HTMLInputTypeAttribute
  errors: Partial<DeepMap<T, FieldError>>
  name: Path<T>
  register: UseFormRegister<T>
  className?: string
  validations?: RegisterOptions
}

const Input = <T extends {}>({
  title,
  type,
  className,
  name,
  register,
  validations,
  errors,
  ...props
}: InputProps<T>) => {
  return (
    <label>
      <h3 className="pb-2">{title}</h3>
      <input
        type={type}
        className={`${className ? className : ""}`}
        {...register(name, validations)}
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => {
          return <p className="mt-1 text-red-600">{message}</p>
        }}
      />
    </label>
  )
}

export default Form
