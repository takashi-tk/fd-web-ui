import React from "react"
import { Link } from "react-router-dom";
import {
    Image,
    Text,
    HStack,
  } from '@chakra-ui/react';

export function DreamAuthor(props) {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Link to={`/gallery/${props.userdets.user_str}/10/1`}>
            <Image
            borderRadius="full"
            boxSize="40px"
            src={props.userdets.avatar?props.userdets.avatar:"/avatar-placeholder.gif"}
            alt={`Avatar of ${props.userdets.user_name}`}
            />
            <Text fontWeight="medium">{props.userdets.user_name}</Text>
        </Link>
      </HStack>
    );
  };