import React from "react";
import { Spinner, Flex } from "@chakra-ui/react";
import "./PersonalizedFallback.css";

const PersonalizedFallback = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Flex
                height="460px"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner
                    thickness="8px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    w="24" h="24"
                />
            </Flex>
        </div>
    );
};

export default PersonalizedFallback;