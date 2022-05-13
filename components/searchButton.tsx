import { Col, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import { useRouter } from "next/router";

type Props = {
    readonly input: string,
    validated: boolean
}

const SearchButton = ({ input, validated }: Props) => {
    const router = useRouter();
    return (
        <Col xs="auto" className="my-1">
            <Button variant="secondary" className={styles.searchButton} onClick={() => router.push(`/filterlist/${input}`)} disabled={!validated} >Search</Button>
        </Col>)
}

export default SearchButton;