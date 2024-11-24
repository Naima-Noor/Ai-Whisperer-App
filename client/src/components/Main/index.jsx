import styles from "./styles.module.css";
import UploadComponent from '../TextAnalysis/TextAnalysis';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
	

			<div>
				<UploadComponent/>
			
		</div>
	);
};

export default Main;
