// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateExpenseModal } from "@/redux/slicers/pages/expenses";

// Hooks
import { useForm, usePage } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";
import ReactQuill from "react-quill";

// Types
import { RootState } from "@/redux/store";

const CreateExpenseModal: RC = () => {
  const { pageWords } = usePage().props as ServerProps;
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.expensesPage.createExpenseModalDisplay);

  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    amount: 0,
    date: "",
    method: "cash",
    description: "",
    receipt: null
  });

  // Handle upload receipt
  const handleUploadReceipt = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData('receipt', file as any);
  }

  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleCreateExpenseModal());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('expenses.create'), {
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
        <Modal.Title >{pageWords?.create_product}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={'form'} onSubmit={handleSubmit}>
          <div className="form-double">
            <FormGroup>
              <FormLabel>{pageWords?.method}</FormLabel>
              <FormSelect
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('method', e.target.value)}
                required
              >
                <option value="cash">{pageWords?.cash}</option>
                <option value="payment">{pageWords?.payment}</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.amount}</FormLabel>
              <FormControl
                className={errors.amount && "is-invalid"}
                placeholder={pageWords?.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('amount', Number(e.target.value))}
                value={data.amount}
                type="number"
                required
              />
              <FormError message={errors.amount} />
            </FormGroup>
          </div>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.date}</FormLabel>
            <FormControl
              className={errors.date && "is-invalid"}
              type="date"
              placeholder={pageWords?.date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('date', e.target.value)}
              value={data.date}
            />
            <FormError message={errors.date} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.receipt}</FormLabel>
            <FormControl
              type="file"
              className={errors.receipt && "is-invalid"}
              onChange={handleUploadReceipt}
            />
            <FormError message={errors.receipt} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.description}</FormLabel>
            <ReactQuill
              theme="snow"
              placeholder={pageWords?.description}
              onChange={(e) => setData('description', e)}
              value={data.description}
            />
            <FormError message={errors.description} />
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

export default CreateExpenseModal;
