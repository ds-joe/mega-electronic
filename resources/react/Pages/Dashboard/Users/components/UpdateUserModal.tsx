// Dependencies
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleUpdateUserModalDisplay } from "@/redux/slicers/pages/users";

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

const UpdateUserModal: FCComponent = ({ pageWords }) => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.usersPage.updateUserModalDisplay);
  const updatingUser = useSelector((state: RootState) => state.usersPage.updatingUser);
  const [avatar, setAvatar] = useState<string>(updatingUser?.avatar ? updatingUser.avatar : fakeAvatar);


  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    id: 0,
    full_name: "",
    email: "",
    type: "",
    avatar: null,
    verified: false,
    new_password: null,
    new_password_confirmation: null
  });

  // Handle upload avatar
  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData('avatar', file as any);
    setAvatar(file ? URL.createObjectURL(file) : fakeAvatar);
  }

  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleUpdateUserModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('users.update'), {
      forceFormData: true
    });
  }

  // Set user data
  useEffect(() => {
    if (updatingUser) {
      setData({
        ...data,
        id: updatingUser.id as number,
        full_name: updatingUser.full_name as string,
        email: updatingUser.email as string,
        type: updatingUser.type as string,
        verified: updatingUser.verified as boolean,
      });
    }
  }, [updatingUser]);

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
              <FormLabel className={"form-label"}>{pageWords?.new_password}</FormLabel>
              <FormControl
                className={errors.new_password && "is-invalid"}
                placeholder={pageWords?.new_password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('new_password', e.target.value as any)}
                value={data.new_password as any}
                type="password"
              />
              <FormError message={errors.new_password} />
            </FormGroup>
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.confirm_password}</FormLabel>
              <FormControl
                className={errors.new_password_confirmation && "is-invalid"}
                placeholder={pageWords?.confirm_password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('new_password_confirmation', e.target.value as any)}
                value={data.new_password_confirmation as any}
                type="password"
              />
              <FormError message={errors.new_password_confirmation} />
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.type}</FormLabel>
            <FormSelect
              className={`form-control ${errors.type && "is-invalid"}`}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('type', e.target.value)}
              required
            >
              <option value="supporter" selected={updatingUser?.type === "supporter"}>{pageWords?.supporter}</option>
              <option value="admin" selected={updatingUser?.type === "admin"}>{pageWords?.admin}</option>
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
              checked={data.verified}
            />
          </FormGroup>
          <FormGroup className="flex items-center gap-2">
            <Button type="submit" disabled={processing} >
              {pageWords?.update}
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

export default UpdateUserModal;
