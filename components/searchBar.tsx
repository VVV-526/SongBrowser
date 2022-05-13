
const Search = () => {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [validated, setValidated] = useState(false);
    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const user_input = event.currentTarget.value;
        if (user_input.length > 0) {
            setValidated(true);
        }
        setInput(user_input);
    }

return (
    <Col sm={6} className="my-1">
        <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
            Name
        </Form.Label>
        <Form.Control required type="text" id="inlineFormInputName" value={input} placeholder="Search Artist/Song/Album" onChange={changeHandler} />
        <Form.Control.Feedback type="invalid">
            Please enter a fullname. E.g. Taylor Swift
        </Form.Control.Feedback>
    </Col>
)