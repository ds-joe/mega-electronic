import { ChangeEvent, useEffect } from "react";

// Components
import { Card, FormLabel, FormGroup, FormControl } from "react-bootstrap";

// Hooks
import { useForm, usePage } from "@inertiajs/react";
import useToast from "@/hooks/useToast";

const ImagesButtons: RC = () => {
  const { pageWords } = usePage().props as ServerProps;
  const { data, setData, wasSuccessful, reset, post } = useForm({
    avatar: null
  });
  const { confirmationToast } = useToast();
  // Handle upload avatar
  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData('avatar', file as any);
  }

  // Avatar change
  useEffect(() => {
    data.avatar && confirmationToast(pageWords?.do_you_want_change_your_avatar, () => {
      post(route('profile.change.avatar'), {
        forceFormData: true
      });
    });
  }, [data.avatar]);

  // Clean up
  useEffect(() => {
    wasSuccessful && setTimeout(() => location.reload(), 1000);
    return () => {
      reset("avatar")
    }
  }, [wasSuccessful]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{pageWords?.uploads}</Card.Title>
      </Card.Body>
      <Card.Body className="flex items-center gap-3 flex-wrap">
        <FormGroup>
          <FormLabel className="btn btn-outline-primary btn-icon w-fit" htmlFor="avatar" >
            <i className="fas fa-image" />
            {pageWords?.avatar}
          </FormLabel>
          <FormControl type="file" className={`hide`} id="avatar" onChange={handleUploadAvatar} />
        </FormGroup>
      </Card.Body>
    </Card>
  )
}

export default ImagesButtons;
