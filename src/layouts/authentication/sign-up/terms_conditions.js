/* eslint-disable react/prop-types */
// import { useState } from "react";
// import PropTypes from "prop-types";
// import { Button, Modal, Box, Typography, Checkbox } from "@mui/material/";

// function TermsAndConditionsModal({ isOpen, onClose, onAccept }) {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleAccept = () => {
//     if (isChecked) {
//       onAccept();
//     }
//   };

//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           maxWidth: 500,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Termos e Condições
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Registrando-se ao portal da Katru voce aceita os seguintes termos: 1. Não é permitido o
//           uso de bots ou qualquer outro tipo de automação para realizar ações no portal. 2. Não é
//           permitido o uso de ferramentas de terceiros para realizar ações no portal. 3. Não é
//           permitido compartilhar sua senha com terceiros.
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
//           <Typography variant="body1" gutterBottom>
//             Eu li e aceito os termos e condições
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//           <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
//             Cancelar
//           </Button>
//           <Button variant="contained" onClick={handleAccept} disabled={!isChecked}>
//             Aceitar
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// TermsAndConditionsModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onAccept: PropTypes.func.isRequired,
// };

// export default TermsAndConditionsModal;

import { Modal, Box, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function TermsAndConditionsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: 500,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Termos e Condições
        </Typography>
        <Typography variant="body1" gutterBottom>
          Registrando-se ao portal da Katru voce aceita os seguintes termos:
          <br />
          1. Não é permitido bots ou qualquer outro tipo de automação para realizar ações no portal.
          <br />
          2. Não é permitido o uso de ferramentas de terceiros para realizar ações no portal.
          <br />
          3. Não é permitido compartilhar sua senha com terceiros e outros usuários.
          <br />
        </Typography>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" onClick={onClose} fullWidth>
            Voltar
          </MDButton>
        </MDBox>
      </Box>
    </Modal>
  );
}

export default TermsAndConditionsModal;
