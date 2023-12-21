// Dependencies
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateUserModalDisplay } from "@/redux/slicers/pages/users";

// Hooks
import { useForm } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, Image } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";
import CheckRadio from "@/Components/Form/CheckRadio";

// Types
import { FCComponent } from "@/types/App";
import { RootState } from "@/redux/store";

// Assets
import fakeAvatar from "~/images/auth/userAvatar.svg";

const CreateUserModal: FCComponent = ({ pageWords }) => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.usersPage.createUserModalDisplay);
  const [avatar, setAvatar] = useState<string>(fakeAvatar);

  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    full_name: "",
    email: "",
    type: "",
    avatar: null,
    verified: false,
    password: "",
    password_confirmation: ""
  });

  // Handle upload avatar
  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData('avatar', file as any);
    setAvatar(file ? URL.createObjectURL(file) : fakeAvatar);
  }

  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleCreateUserModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('users.create'), {
      forceFormData: true
    });
  }

  // Clean up
  useEffect(() => {
    if (wasSuccessful) {
      handleCloseModal();
      reset();
    }
  }, [wasSuccessful]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.create_user}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={'form'} onSubmit={handleSubmit}>
          <FormGroup className="flex items-center justify-center">
            <Image
              src={avatar}
              alt=""
              className="avatar avatar-lg"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.full_name}</FormLabel>
            <FormControl
              className={errors.full_name && "is-invalid"}
              placeholder={pageWords?.full_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('full_name', e.target.value)}
              value={data.full_name}
              required
            />
            <FormError message={errors.full_name} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.email}</FormLabel>
            <FormControl
              className={errors.email && "is-invalid"}
              placeholder={pageWords?.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
              value={data.email}
              required
            />
            <FormError message={errors.email} />
          </FormGroup>
          <FormGroup className="form-double">
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.password}</FormLabel>
              <FormControl
                className={errors.password && "is-invalid"}
                placeholder={pageWords?.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                value={data.password}
                type="password"
                required
              />
              <FormError message={errors.password} />
            </FormGroup>
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.confirm_password}</FormLabel>
              <FormControl
                className={errors.password_confirmation && "is-invalid"}
                placeholder={pageWords?.confirm_password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('password_confirmation', e.target.value)}
                value={data.password_confirmation}
                type="password"
                required
              />
              <FormError message={errors.password_confirmation} />
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.type}</FormLabel>
            <FormSelect
              className={`form-control ${errors.type && "is-invalid"}`}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('type', e.target.value)}
              required
            >
              <option value="" defaultValue={""} selected disabled>{pageWords?.type}</option>
              <option value="supporter">{pageWords?.supporter}</option>
              <option value="admin">{pageWords?.admin}</option>
            </FormSelect>
            <FormError message={errors.type} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.avatar}</FormLabel>
            <FormControl
              name="avatar"
              type="file"
              className={errors.avatar && "is-invalid"}
              onChange={handleUploadAvatar}
            />
            <FormError message={errors.avatar} />
          </FormGroup>
          <FormGroup>
            <CheckRadio
              type={"switch"}
              label={pageWords?.verified}
              onChange={(e) => setData("verified", e.target.checked)}
            />
          </FormGroup>
          <FormGroup className="flex items-center gap-2">
            <Button type="submit" disabled={processing} >
              {pageWords?.create}
            </Button>
            <Button type="button" className="btn-danger" onClick={handleCloseModal}>
              {pageWords?.cancel}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateUserModal;
