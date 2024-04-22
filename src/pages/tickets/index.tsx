import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Ticketpage.module.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Avatar } from "primereact/avatar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";

import {
  BULK_DELETE_CUSTOMER_TICKETS,
  CUSTOMER_DELETE_TICKET,
  GET_CUSTOMER_TICKETS,
  GET_TICKET_DETAIL,
} from "../api/lib/tickets_graphql";
import client_server from "../api/lib/apollo-client_server";
import { ProgressSpinner } from "primereact/progressspinner";
import moment from "moment-timezone";

const ascendingDescendingOptions = [
  { label: "Date (Asc)", value: "asc" },
  { label: "Date (Desc)", value: "desc" },
];

export default function Ticket_Page() {
  const [visibleItems, setVisibleItems] = useState<any>(
    process.env.NEXT_PUBLIC_TICKET_LIMITS
  );
  const itemsToAdd = process.env.NEXT_PUBLIC_TICKET_LIMITS;
  const [deleteProductsDialog, setDeleteProductsDialog] =
    useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState<string>("");
  const [customerDeleteId, setCustomerDeleteId] = useState<string>("");
  const [divClass, setDivClass] = useState<any>("expanddiv");
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [customerTickets, setCustomerTickets] = useState<any[]>([]);
  const [customerTicketDetails, setCustomerTicketDetails] = useState<any>([]);
  const [apiKey, setApiKey] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [timezoneLabel, setTimezoneLabel] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("userData");
      const userParse: any = userData && JSON.parse(userData);
      setApiKey(userParse && userParse?.api_key);
      getCustomerTIcket(userParse && userParse?.api_key);
    }
    const userTimezone = moment.tz.guess();
    if (userTimezone === "Asia/Kolkata" || userTimezone === "Asia/Calcutta") {
      setTimezoneLabel("IST");
    } else {
      setTimezoneLabel("UTC");
    }
  }, []);

  const handleSortOrderChange = (e: any) => {
    const selectedValue = e.value;
    setSortOrder(selectedValue);

    // Sort the filteredCustomers array based on the selected value
    const sortedCustomers = [...filteredCustomers].sort((a: any, b: any) => {
      const timestampA = new Date(a?.timeStampData?.createdOn).getTime();
      const timestampB = new Date(b?.timeStampData?.createdOn).getTime();

      if (selectedValue === "asc") {
        return timestampA - timestampB; // Sort in ascending order
      } else {
        return timestampB - timestampA; // Sort in descending order
      }
    });

    setFilteredCustomers(sortedCustomers);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = async () => {
    if (customerDeleteId && customerDeleteId) {
      try {
        const res = await client_server.mutate({
          mutation: CUSTOMER_DELETE_TICKET,
          variables: {
            input: {
              apiKey: {
                ApiKey: apiKey,
              },
              ticketID: {
                ID: customerDeleteId,
              },
            },
          },
        });
        if (res && res?.data) {
          if (divClass === "expanddiv") {
            const updatedTickets = customerTickets.filter(
              (ticket) => ticket.ID.ID !== customerDeleteId
            );
            setCustomerTickets(updatedTickets);
            const updatedFilteredCustomers = filteredCustomers.filter(
              (ticket) => ticket.ID.ID !== customerDeleteId
            );
            toast.success("Ticket Deleted successfully");
            setDeleteProductsDialog(false);
            setFilteredCustomers(updatedFilteredCustomers);
            setDivClass("collapsediv");
          } else {
            const updatedTickets = customerTickets.filter(
              (ticket) => ticket.ID.ID !== customerDeleteId
            );
            setCustomerTickets(updatedTickets);
            const updatedFilteredCustomers = filteredCustomers.filter(
              (ticket) => ticket.ID.ID !== customerDeleteId
            );
            toast.success("Ticket Deleted successfully");
            setDeleteProductsDialog(false);
            setFilteredCustomers(updatedFilteredCustomers);
            setDivClass("expanddiv");
          }
        }
      } catch (error) {
        setDeleteProductsDialog(false);
        console.log("err", error);
      }
    } else {
      const selectedIds = selectedProducts.map((product) => product.ID.ID);
      const ticketIDs = selectedIds.map((id) => ({ ID: id }));

      const response = await client_server.mutate({
        mutation: BULK_DELETE_CUSTOMER_TICKETS,
        variables: {
          input: {
            apiKey: {
              ApiKey: apiKey,
            },
            ticketIDs: ticketIDs,
          },
        },
      });
      if (response && response?.data) {
        const updatedTickets = customerTickets.filter(
          (ticket) => !selectedIds.includes(ticket.ID.ID)
        );
        setCustomerTickets(updatedTickets);

        const updatedFilteredCustomers = filteredCustomers.filter(
          (ticket) => !selectedIds.includes(ticket.ID.ID)
        );
        setFilteredCustomers(updatedFilteredCustomers);
        setSelectedProducts([]);
        toast.success("Tickets Delete successfully");
        setDeleteProductsDialog(false);
      }
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2 btnbg">
        <Button
          label="Delete Tickets"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
          className="hidebtnbg"
        />
      </div>
    );
  };

  const handleMore = () => {
    setVisibleItems((prevVisibleItems: any) => prevVisibleItems + itemsToAdd);
  };

  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
        className="cancelbtncss"
      />
      &emsp;
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
        className="confirmbtncss"
      />
    </React.Fragment>
  );

  const handleRowCLick = (id: any) => {
    if (divClass === "expanddiv") {
      setDivClass("collapsediv");
    } else {
      setDivClass("expanddiv");
    }
    getCustomerTIcketDetails(id);
    setCustomerId(id);
  };

  const toggleAllSelection = () => {
    // Check if all items are already selected
    if (selectedProducts.length !== 0) {
      setSelectedProducts([]);
    } else {
      if (selectedProducts.length === customerTickets.length) {
        // If all items are already selected, deselect all
        setSelectedProducts([]);
      } else {
        // If not all items are selected, select up to a maximum of 10 items
        const remainingSelectable = Math.min(10, customerTickets.length);
        const remainingItems = customerTickets.slice(0, remainingSelectable);
        setSelectedProducts([...remainingItems]);
      }
    }
  };

  const toggleSelection = (rowData: any) => {
    const index = selectedProducts.findIndex(
      (product: any) => product?.ID?.ID === rowData?.ID?.ID
    );
    let newSelectedProducts: any[] = [...selectedProducts];

    if (index === -1 && selectedProducts.length < 10) {
      newSelectedProducts.push(rowData);
    } else if (index !== -1) {
      newSelectedProducts.splice(index, 1);
    } else {
      toast.warn("You can only select up to 10 tickets.");
    }
    setSelectedProducts(newSelectedProducts);
  };

  // GET_TICKET_DETAIL
  const getCustomerTIcket = async (keyValue: any) => {
    const response = await client_server.query({
      query: GET_CUSTOMER_TICKETS,
      variables: {
        input: {
          apiKey: {
            ApiKey: keyValue,
          },
          offset: 0,
          pageSize: 10,
        },
      },
    });
    setFilteredCustomers(response && response?.data?.getCustomerTickets);
    setCustomerTickets(response && response?.data?.getCustomerTickets);
  };

  const getCustomerTIcketDetails = async (id: any) => {
    setLoader(true);
    const res = await client_server.query({
      query: GET_TICKET_DETAIL,
      variables: {
        input: {
          apiKey: {
            ApiKey: apiKey,
          },
          ID: {
            ID: id,
          },
        },
      },
    });
    if (res && res?.data) {
      setCustomerTicketDetails(res && res?.data?.getCustomerTicketDetails);
      setLoader(false);
    }
  };

  const handleDelete = async (id: any) => {
    setCustomerDeleteId(id);
    setDeleteProductsDialog(true);
  };

  return (
    <>
      <div className={`common_div ${divClass ? divClass : ""} ${styles.div}`}>
        <div className={styles.div7}>
          <div className={styles.div11}>
            <div className={styles.div12}>
              <div className={styles.div13}>
                <div className={styles.div14}>
                  <div className={styles.div14}>
                    <div className={styles.div15}></div>
                    <div className={styles.div16}>Tickets</div>
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <span className={`p-input-icon-left ${styles.search}`}>
                        <i className="pi pi-search" />
                        <InputText
                          type="search"
                          placeholder="Search..."
                          onInput={(e: any) => {
                            const searchText = e.target.value.toLowerCase();
                            const filteredData = customerTickets.filter(
                              (ticket) => {
                                const idMatch =
                                  ticket?.ID?.ID.toLowerCase().includes(
                                    searchText
                                  );
                                const firstNameMatch =
                                  ticket?.endUserData?.firstName
                                    .toLowerCase()
                                    .includes(searchText);
                                const lastNameMatch =
                                  ticket?.endUserData?.lastName
                                    .toLowerCase()
                                    .includes(searchText);
                                const emailMatch =
                                  ticket?.endUserData?.contact?.email
                                    .toLowerCase()
                                    .includes(searchText);
                                const phoneMatch =
                                  ticket?.endUserData?.contact?.phone
                                    .toLowerCase()
                                    .includes(searchText);

                                return (
                                  idMatch ||
                                  firstNameMatch ||
                                  lastNameMatch ||
                                  emailMatch ||
                                  phoneMatch
                                );
                              }
                            );
                            setFilteredCustomers(filteredData);
                            setVisibleItems(10);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <Dropdown
                    value={sortOrder}
                    options={ascendingDescendingOptions}
                    onChange={handleSortOrderChange}
                    placeholder="Order by"
                  />
                </div>
              </div>
            </div>
            <div
              className={`data-main ${divClass ? divClass : ""} ${
                styles.div143
              }`}
            >
              <div className={`data-table-type ${styles.div17}`}>
                <div className={`data-row-header ${styles.div18}`}>
                  <div className={styles.div19}>
                    <Checkbox
                      onChange={toggleAllSelection}
                      checked={
                        (selectedProducts.length === customerTickets.length &&
                          customerTickets.length > 0) ||
                        selectedProducts.length > 0
                      }
                      className="checboxcss"
                    ></Checkbox>
                  </div>
                  <div className={styles.div33}>
                    <span>ID</span>
                  </div>
                  <div className={styles.div20}>
                    <span>First Name</span>
                  </div>
                  <div className={`collapse-hide ${styles.div21}`}>
                    <span>Last Name</span>
                  </div>
                  <div className={`collapse-hide ticket-email ${styles.div21}`}>
                    <span>Email</span>
                  </div>
                  <div className={`collapse-hide ticket-phone ${styles.div21}`}>
                    <span>Phone</span>
                  </div>
                  <div className={`collapse-hide ${styles.div21}`}>
                    <span>
                      Created Date(
                      {timezoneLabel && timezoneLabel})
                    </span>
                  </div>
                  {/* <div className={styles.div28}>
                    <span>Action</span>
                  </div> */}
                </div>
                {filteredCustomers &&
                  filteredCustomers.slice(0, visibleItems).map((ea) => (
                    <div
                      className={`data-row ${styles.div18}`}
                      key={ea?.ID?.ID}
                    >
                      <div className={styles.div19}>
                        <Checkbox
                          checked={selectedProducts.some(
                            (product: any) => product?.ID?.ID === ea?.ID?.ID
                          )}
                          onChange={() => toggleSelection(ea)}
                          className="checboxcss"
                        ></Checkbox>
                      </div>
                      <div className={styles.div33}>
                        <span onClick={() => handleRowCLick(ea?.ID?.ID)}>
                          {/* {ea?.ID?.ID?.slice(0, 5) + "..."} */}
                          <InputText
                            type="text"
                            placeholder={ea?.ID?.ID?.slice(0, 5) + "..."}
                            tooltip={ea?.ID?.ID}
                            tooltipOptions={{
                              className: "hoverClass",
                              position: "bottom",
                              mouseTrack: true,
                              mouseTrackTop: 16,
                            }}
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#5f9ea0",
                            }}
                            className="tooltipcss placeholder-blue"
                            readOnly
                          />
                        </span>
                      </div>
                      <div className={`user-image ${styles.div22}`}>
                        <div className={styles.div27}>
                          <p className="listname">
                            {ea?.endUserData?.firstName}
                          </p>
                        </div>
                      </div>
                      <div className={`collapse-hide ${styles.div23}`}>
                        <p> {ea?.endUserData?.lastName}</p>
                      </div>
                      <div
                        className={`collapse-hide ticket-email ${styles.div23}`}
                      >
                        <p> {ea?.endUserData?.contact?.email}</p>
                      </div>
                      <div className={`collapse-hide ${styles.div23}`}>
                        <p>{ea?.endUserData?.contact?.phone}</p>
                      </div>
                      <div className={`created_badge ${styles.div23}`}>
                        <span>
                          {ea?.timeStampData?.createdOn
                            ? moment(ea?.timeStampData?.createdOn)
                                .local()
                                .format("DD MMM YYYY")
                            : ""}
                        </span>
                      </div>
                      {/* <div className={styles.div28}>
                            <span onClick={handleRowCLick}>
                              <svg
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.48 29.52L25.4 18L13.48 6.47998C13.1551 6.16702 12.7192 5.99595 12.2682 6.00439C11.8172 6.01283 11.388 6.20009 11.075 6.52498C10.762 6.84987 10.591 7.28577 10.5994 7.7368C10.6078 8.18782 10.7951 8.61702 11.12 8.92998L20.51 18L11.12 27.08C10.7951 27.3929 10.6078 27.8221 10.5994 28.2732C10.591 28.7242 10.762 29.1601 11.075 29.485C11.3879 29.8099 11.8171 29.9971 12.2682 30.0056C12.7192 30.014 13.1551 29.8429 13.48 29.53L13.48 29.52Z"
                                  fill="#ffffff"
                                />
                              </svg>
                            </span>
                          </div> */}
                    </div>
                  ))}
                {filteredCustomers && filteredCustomers?.length === 0 ? (
                  <div className={styles.maindivfound}>
                    <h3 className={styles.notfoundticket}>No tickets found!</h3>
                  </div>
                ) : (
                  ""
                )}

                {customerTickets?.length > visibleItems && (
                  <div className={styles.div99} onClick={handleMore}>
                    Load more
                  </div>
                )}
              </div>
              <div
                className={`data-details ${divClass ? divClass : ""} ${
                  styles.div
                }`}
              >
                {!loader ? (
                  <div className="card flex justify-content-center">
                    <div className="container-box">
                      <div
                        className={styles.div105}
                        onClick={() => handleRowCLick(customerId)}
                      >
                        <button
                          type="button"
                          className={`cancel_btn ${divClass ? divClass : ""} ${
                            styles.div
                          }`}
                        >
                          <svg
                            width="38"
                            height="38"
                            viewBox="0 0 38 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3 25.821L19 20.121L24.7 25.821L25.821 24.7L20.121 19L25.821 13.3L24.7 12.179L19 17.879L13.3 12.179L12.179 13.3L17.879 19L12.179 24.7L13.3 25.821ZM19.0048 33.25C17.0351 33.25 15.1826 32.8763 13.4473 32.129C11.713 31.3806 10.2041 30.3652 8.9205 29.0827C7.63694 27.8012 6.62097 26.2939 5.87258 24.5607C5.12419 22.8274 4.75 20.9755 4.75 19.0048C4.75 17.0351 5.12367 15.1826 5.871 13.4473C6.61939 11.713 7.63483 10.2041 8.91733 8.9205C10.1988 7.63694 11.7061 6.62097 13.4393 5.87258C15.1726 5.12419 17.0245 4.75 18.9952 4.75C20.9649 4.75 22.8174 5.12367 24.5528 5.871C26.287 6.61939 27.7959 7.63483 29.0795 8.91733C30.3631 10.1988 31.379 11.7061 32.1274 13.4393C32.8758 15.1726 33.25 17.0245 33.25 18.9952C33.25 20.9649 32.8763 22.8174 32.129 24.5528C31.3806 26.287 30.3652 27.7959 29.0827 29.0795C27.8012 30.3631 26.2939 31.379 24.5607 32.1274C22.8274 32.8758 20.9755 33.25 19.0048 33.25ZM19 31.6667C22.5361 31.6667 25.5312 30.4396 27.9854 27.9854C30.4396 25.5312 31.6667 22.5361 31.6667 19C31.6667 15.4639 30.4396 12.4687 27.9854 10.0146C25.5312 7.56042 22.5361 6.33333 19 6.33333C15.4639 6.33333 12.4687 7.56042 10.0146 10.0146C7.56042 12.4687 6.33333 15.4639 6.33333 19C6.33333 22.5361 7.56042 25.5312 10.0146 27.9854C12.4687 30.4396 15.4639 31.6667 19 31.6667Z"
                              fill="#333333"
                            />
                          </svg>
                        </button>
                      </div>
                      {customerTicketDetails && (
                        <>
                          {customerTicketDetails?.ID?.ID === customerId ? (
                            <div className="button-text">
                              <div className={styles.bodyimage}>
                                <div className={styles.bodyimage}>
                                  <div className={styles.containerdiv}>
                                    <Avatar
                                      label={
                                        customerTicketDetails.endUserData.firstName
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                        "" +
                                        customerTicketDetails.endUserData.lastName
                                          ?.charAt(0)
                                          ?.toUpperCase()
                                      }
                                      size="xlarge"
                                      shape="circle"
                                      className="textavatar"
                                    />
                                    <div className="body_sub_heading">
                                      <p className="listname first">
                                        {customerTicketDetails.endUserData
                                          .firstName +
                                          " " +
                                          customerTicketDetails.endUserData
                                            .lastName}
                                      </p>
                                    </div>
                                  </div>
                                  <div className={styles.containerdiv}></div>
                                </div>
                              </div>
                              <div
                                className="button-delete"
                                onClick={() =>
                                  handleDelete(customerTicketDetails?.ID?.ID)
                                }
                              >
                                <Button
                                  className={styles.div165}
                                  label="Delete"
                                  type="submit"
                                  iconPos="right"
                                  icon="pi pi-trash"
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                    <br />
                    <br />
                    {customerTicketDetails && (
                      <>
                        {customerTicketDetails?.ID?.ID === customerId ? (
                          <>
                            <div className="form-fields">
                              <label htmlFor="username">Ticket ID</label>
                              <br />
                              <InputText
                                id="username"
                                aria-describedby="username-help"
                                className={`text_input ${styles.textfield1}`}
                                disabled
                                value={customerTicketDetails?.ID?.ID} // Hardcoded ID for demo
                              />
                            </div>
                            <div className="form-fields">
                              <label htmlFor="username">First Name</label>
                              <br />
                              <InputText
                                id="username"
                                aria-describedby="username-help"
                                className={`text_input ${styles.textfield2}`}
                                disabled
                                value={
                                  customerTicketDetails.endUserData.firstName
                                }
                              />
                            </div>{" "}
                            <div className="form-fields">
                              <label htmlFor="username">Last Name</label>
                              <br />
                              <InputText
                                id="lastname"
                                aria-describedby="username-help"
                                className={`text_input ${styles.textfield2}`}
                                disabled
                                value={
                                  customerTicketDetails.endUserData.lastName
                                }
                              />
                            </div>
                            <div className="form-fields">
                              <label htmlFor="username">Email</label>
                              <br />
                              <InputText
                                id="email"
                                aria-describedby="username-help"
                                className={`text_input ${styles.textfield2}`}
                                disabled
                                value={
                                  customerTicketDetails.endUserData.contact
                                    .email
                                }
                              />
                            </div>
                            <div className="form-fields">
                              <label htmlFor="username">Phone</label>
                              <br />
                              <InputText
                                id="phone"
                                aria-describedby="username-help"
                                className={`text_input ${styles.textfield2}`}
                                disabled
                                value={
                                  customerTicketDetails.endUserData.contact
                                    .phone
                                }
                              />
                            </div>{" "}
                            <div className="form-fields">
                              <label htmlFor="username">Title</label>
                              <br />
                              <InputText
                                id="username"
                                aria-describedby="username-help"
                                className={`text_input ${styles.textfield3}`}
                                disabled
                                value={
                                  customerTicketDetails.ticketDetails.title
                                }
                              />
                            </div>
                            <div>
                              <label htmlFor="username">Description</label>
                              <br />
                              <InputTextarea
                                value={
                                  customerTicketDetails.ticketDetails
                                    .description
                                }
                                rows={5}
                                cols={30}
                                disabled
                                className={`text_area ${styles.textfield1}`}
                              />
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className={styles.aligncenter}>
                    <div className="card flex justify-content-center">
                      <ProgressSpinner
                        style={{ width: "50px", height: "50px" }}
                        strokeWidth="3"
                        fill="var(--surface-ground)"
                        animationDuration=".5s"
                      />
                      <p className={styles.spinnerloading}>Loading...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.div100}>
          <div className={styles.div101}>
            <img
              loading="lazy"
              src="/tickets/light.png"
              className={styles.img14}
            />
            <div className={styles.div102}>
              <span style={{ color: "rgba(26, 29, 31, 1)" }}>
                {selectedProducts.length} Tickets &nbsp;
              </span>
              selected
            </div>
          </div>
          <div className={`mainbg ${styles.div103}`}>
            {" "}
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          </div>
        </div>
      </div>
      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
        className="dialogcss"
      >
        <div className="confirmation-content confirmcss">
          <i
            className="pi pi-exclamation-triangle p-mr-3 iconcss"
            style={{ fontSize: "2rem" }}
          />
          &nbsp;
          {selectedProducts && selectedProducts.length > 1 ? (
            <span className="paradialogcss">
              Are you sure you want to delete the selected tickets?
            </span>
          ) : (
            <span className="paradialogcss">
              Are you sure you want to delete the selected ticket?
            </span>
          )}
        </div>
      </Dialog>
    </>
  );
}
