import React, { ChangeEvent, FC, KeyboardEvent, ReactElement, useMemo, useState } from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { translate } from "../../utils/language.utils";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export const SearchProjectsInput: FC<{}> = (): ReactElement => {
    const [searchParams] = useSearchParams();

    const query = useMemo(() => searchParams.get('q') || "", [searchParams])

    const [value, setValue] = useState(query);

  const navigate = useNavigate();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      navigate(value && value.length > 0 ? `/projects?q=${value}` : "/projects");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <AiOutlineSearch />
      </InputLeftElement>
      <Input
        placeholder={translate('SEARCH_PROJECTS')}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};
